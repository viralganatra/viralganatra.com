import React from 'react';
import App from '../components/app';
import SEO from '../components/seo';

export default function NotFoundPage() {
  return (
    <App>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </App>
  );
}
