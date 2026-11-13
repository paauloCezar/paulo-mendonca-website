// Redirects the old *.pages.dev URLs and www to the main domain.
export function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname.endsWith('.pages.dev') || url.hostname === 'www.paulomendonca.dev') {
    url.protocol = 'https:'; url.hostname = 'paulomendonca.dev'; url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
