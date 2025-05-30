'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      setIsSubmitSuccessful(true);
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to send your message. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        {isSubmitSuccessful && (
          <p className="text-green-500">Your message has been sent successfully!</p>
        )}
        {submitError && <p className="text-red-500">{submitError}</p>}
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
      </div>
      <div>
        <button
          type="submit"
          disabled={isProcessing}
          className="relative rounded-full border-2 border-black bg-eclipse-orange px-4 py-1 text-lg font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:bg-eclipse-orange-light active:shadow-none"
        >
          {isProcessing ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
