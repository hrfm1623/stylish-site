/**
 * パララックス効果の実装
 * Intersection Observer APIを使用して高パフォーマンスを実現
 * スクロール位置に基づいて要素を動的に変形
 */

interface ParallaxElement {
  element: HTMLElement;
  speed: number;
  offset: number;
  direction: "up" | "down" | "left" | "right";
}

class ParallaxManager {
  private parallaxElements: ParallaxElement[] = [];
  private ticking = false;
  private windowHeight = 0;
  private scrollY = 0;

  constructor() {
    this.init();
  }

  /**
   * パララックスマネージャーの初期化
   * DOM読み込み完了後に実行される
   */
  private init(): void {
    this.updateWindowHeight();
    this.setupEventListeners();
    this.discoverParallaxElements();
    this.setupIntersectionObserver();
  }

  /**
   * ウィンドウの高さを更新
   * リサイズ時にも呼び出される
   */
  private updateWindowHeight(): void {
    this.windowHeight = window.innerHeight;
  }

  /**
   * イベントリスナーの設定
   * スクロールとリサイズイベントを監視
   */
  private setupEventListeners(): void {
    window.addEventListener("scroll", this.handleScroll.bind(this), {
      passive: true,
    });
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  /**
   * パララックス要素の発見と登録
   * データ属性を持つ要素を自動的に検出
   */
  private discoverParallaxElements(): void {
    const elements = document.querySelectorAll<HTMLElement>("[data-parallax]");

    elements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallaxSpeed || "0.5");
      const offset = parseFloat(element.dataset.parallaxOffset || "0");
      const direction =
        (element.dataset.parallaxDirection as
          | "up"
          | "down"
          | "left"
          | "right") || "up";

      // 速度の範囲を制限（パフォーマンス向上のため）
      const clampedSpeed = Math.max(-2, Math.min(2, speed));

      this.parallaxElements.push({
        element,
        speed: clampedSpeed,
        offset,
        direction,
      });

      // パフォーマンス最適化のためのCSS適用
      element.style.willChange = "transform";
    });
  }

  /**
   * Intersection Observerの設定
   * 画面外の要素のパララックス処理を停止してパフォーマンス向上
   */
  private setupIntersectionObserver(): void {
    const observerOptions = {
      root: null,
      rootMargin: "50px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const parallaxData = this.parallaxElements.find(
          (p) => p.element === element
        );

        if (parallaxData) {
          if (entry.isIntersecting) {
            // 要素が画面内に入った時の処理
            element.style.willChange = "transform";
          } else {
            // 要素が画面外に出た時の処理
            element.style.willChange = "auto";
          }
        }
      });
    }, observerOptions);

    this.parallaxElements.forEach(({ element }) => {
      observer.observe(element);
    });
  }

  /**
   * スクロールイベントのハンドリング
   * requestAnimationFrameを使用して滑らかなアニメーションを実現
   */
  private handleScroll(): void {
    this.scrollY = window.pageYOffset;

    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateParallax();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  /**
   * リサイズイベントのハンドリング
   * ウィンドウサイズ変更時にパララックス要素を再計算
   */
  private handleResize(): void {
    this.updateWindowHeight();
    // デバウンス処理を適用してパフォーマンス向上
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = window.setTimeout(() => {
      this.updateParallax();
    }, 100);
  }

  private resizeTimeout: number = 0;

  /**
   * パララックス効果の更新
   * 各要素のスクロール位置に基づいて変形を適用
   */
  private updateParallax(): void {
    this.parallaxElements.forEach(({ element, speed, offset, direction }) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + this.scrollY;
      const elementHeight = rect.height;
      const windowBottom = this.scrollY + this.windowHeight;

      // 要素が画面内にある場合のみ処理
      if (
        windowBottom > elementTop &&
        this.scrollY < elementTop + elementHeight
      ) {
        const progress =
          (this.scrollY - elementTop + this.windowHeight) /
          (this.windowHeight + elementHeight);
        const clampedProgress = Math.max(0, Math.min(1, progress));

        // 移動距離の計算
        const moveDistance = (clampedProgress - 0.5) * speed * 100 + offset;

        // 方向に基づいた変形の適用
        let transform = "";
        switch (direction) {
          case "up":
            transform = `translateY(${-moveDistance}px)`;
            break;
          case "down":
            transform = `translateY(${moveDistance}px)`;
            break;
          case "left":
            transform = `translateX(${-moveDistance}px)`;
            break;
          case "right":
            transform = `translateX(${moveDistance}px)`;
            break;
        }

        element.style.transform = transform;
      }
    });
  }

  /**
   * パララックス要素を手動で追加
   * 動的に生成された要素に対して使用
   */
  public addParallaxElement(
    element: HTMLElement,
    speed: number = 0.5,
    offset: number = 0,
    direction: "up" | "down" | "left" | "right" = "up"
  ): void {
    const clampedSpeed = Math.max(-2, Math.min(2, speed));

    this.parallaxElements.push({
      element,
      speed: clampedSpeed,
      offset,
      direction,
    });

    element.style.willChange = "transform";
  }

  /**
   * パララックス要素を削除
   * 不要になった要素をクリーンアップ
   */
  public removeParallaxElement(element: HTMLElement): void {
    const index = this.parallaxElements.findIndex((p) => p.element === element);
    if (index !== -1) {
      this.parallaxElements.splice(index, 1);
      element.style.transform = "";
      element.style.willChange = "auto";
    }
  }

  /**
   * 全パララックス効果を無効化
   * パフォーマンス問題がある場合の緊急停止
   */
  public disable(): void {
    this.parallaxElements.forEach(({ element }) => {
      element.style.transform = "";
      element.style.willChange = "auto";
    });

    window.removeEventListener("scroll", this.handleScroll.bind(this));
    window.removeEventListener("resize", this.handleResize.bind(this));
  }
}

/**
 * フェードインアニメーションの実装
 * スクロール時に要素を順次表示
 */
class ScrollRevealManager {
  private revealElements: HTMLElement[] = [];

  constructor() {
    this.init();
  }

  /**
   * スクロール時表示効果の初期化
   */
  private init(): void {
    this.discoverRevealElements();
    this.setupIntersectionObserver();
  }

  /**
   * 表示対象要素の発見
   */
  private discoverRevealElements(): void {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    this.revealElements = Array.from(elements);

    // 初期状態を設定
    this.revealElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
    });
  }

  /**
   * Intersection Observerによる表示制御
   */
  private setupIntersectionObserver(): void {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const delay = parseFloat(element.dataset.revealDelay || "0");

          window.setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }, delay);

          observer.unobserve(element);
        }
      });
    }, observerOptions);

    this.revealElements.forEach((element) => {
      observer.observe(element);
    });
  }
}

// DOM読み込み完了時に初期化
document.addEventListener("DOMContentLoaded", () => {
  // パフォーマンス確認（モーション設定が無効でない場合のみ実行）
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    new ParallaxManager();
    new ScrollRevealManager();
  }
});

// モジュールとしてエクスポート
export { ParallaxManager, ScrollRevealManager };
