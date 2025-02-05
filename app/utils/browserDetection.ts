export const isMobileSafari = (): boolean => {
    const ua = navigator.userAgent.toLowerCase();
    return (
      /safari/.test(ua) &&
      /mobile/.test(ua) &&
      !/chrome/.test(ua) &&
      !/android/.test(ua) &&
      !/crios/.test(ua) // Exclude Chrome on iOS
    );
  };
  