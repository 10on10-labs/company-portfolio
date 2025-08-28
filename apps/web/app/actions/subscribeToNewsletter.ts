'use server';

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email');

  await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
