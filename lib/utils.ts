import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import _debug from 'debug';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 获取 url search 参数
export function getSearchParams(key:string) {
  if (isWindow) {
    var searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
  }
}

export var isWindow = typeof window !== 'undefined';
export var isLocal = isWindow && window.location.hostname === 'localhost';
export var isDev = process.env.NODE_ENV === 'development';
export var isProd = process.env.NODE_ENV === 'production';
export var isAE = isWindow && /AliApp\(AE/.test(navigator.userAgent);
export var isChrome = isWindow && /Chrome\//.test(navigator.userAgent);
// export var isChromeScript = typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined';
// export var isChromeBackground = isChromeScript && !isWindow;

// Debug 文档
// https://www.npmjs.com/package/debug

export function createDebug(namespace:string) {
  if (isChrome) {
    console.log('[debug] 如果要看到 debug 信息，请在控制台打开 verbose level');
  }
  if (isDev) {
    _debug.enable(namespace);
  } else {
    console.log('[debug] 如果要看到 debug 信息，请在 url 添加参数 ?debug=1');
  }
  return _debug(namespace);
}
export var debug = createDebug('app');
