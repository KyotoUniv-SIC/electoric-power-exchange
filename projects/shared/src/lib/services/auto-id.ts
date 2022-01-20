export function autoID() {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let autoID = '';

  for (let i = 0; i < 20; i++) {
    autoID += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoID;
}
