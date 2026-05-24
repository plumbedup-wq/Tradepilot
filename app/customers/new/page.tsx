'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { BackLink } from '@/components/back-link';
import type { CustomerInput } from '@/lib/customers/types';

const initialData: CustomerInput = {
  customerType: 'business',
  businessName: '',
  tradingName: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  mobile: '',
  addressLine1: '',
  addressLine2: '',
  suburb: '',
  city: '',
  postCode: '',
  country: 'NZ',
  paymentTermsDays: 20,
  hourlyRate: '',
  materialMarkupPercent: '',
  materialGpPercent: '',
  notes: ''
};

export default function NewCustomerPage() {
  const [form, setForm] = useState<CustomerInput>(initialData);
  const [message, setMessage] = useState('');

  function set<K extends keyof CustomerInput>(key: K, value: CustomerInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Customer saved locally (next step: wire Supabase insert).');
  }

  return (
    <main className="settings-shell">
      <BackLink href="/customers" label="Back to customer hub" />
      <div className="settings-head">
        <h1>New Customer</h1>
        <Link href="/customers" className="ghost-btn" style={{ textDecoration: 'none' }}>Cancel</Link>
      </div>

      <form onSubmit={onSubmit} className="customer-form">
        <section>
          <h2>Contact & Identity</h2>
          <div className="form-grid-two">
            <label className="field">Customer Type
              <select value={form.customerType} onChange={(e) => set('customerType', e.target.value as CustomerInput['customerType'])}>
                <option value="business">Business</option>
                <option value="individual">Individual</option>
              </select>
            </label>
            <label className="field">Business Name<input value={form.businessName} onChange={(e) => set('businessName', e.target.value)} /></label>
            <label className="field">Trading Name<input value={form.tradingName} onChange={(e) => set('tradingName', e.target.value)} /></label>
            <label className="field">First Name<input value={form.firstName} onChange={(e) => set('firstName', e.target.value)} /></label>
            <label className="field">Last Name<input value={form.lastName} onChange={(e) => set('lastName', e.target.value)} /></label>
            <label className="field">Email<input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} /></label>
            <label className="field">Phone<input value={form.phone} onChange={(e) => set('phone', e.target.value)} /></label>
            <label className="field">Mobile<input value={form.mobile} onChange={(e) => set('mobile', e.target.value)} /></label>
          </div>
        </section>

        <section>
          <h2>Address</h2>
          <div className="form-grid-two">
            <label className="field">Address Line 1<input value={form.addressLine1} onChange={(e) => set('addressLine1', e.target.value)} /></label>
            <label className="field">Address Line 2<input value={form.addressLine2} onChange={(e) => set('addressLine2', e.target.value)} /></label>
            <label className="field">Suburb<input value={form.suburb} onChange={(e) => set('suburb', e.target.value)} /></label>
            <label className="field">City<input value={form.city} onChange={(e) => set('city', e.target.value)} /></label>
            <label className="field">Post Code<input value={form.postCode} onChange={(e) => set('postCode', e.target.value)} /></label>
            <label className="field">Country<input value={form.country} onChange={(e) => set('country', e.target.value)} /></label>
          </div>
        </section>

        <section>
          <h2>Commercial Settings</h2>
          <div className="form-grid-two">
            <label className="field">Payment Terms (days)<input type="number" min={0} value={form.paymentTermsDays} onChange={(e) => set('paymentTermsDays', Number(e.target.value || 0))} /></label>
            <label className="field">Hourly Rate<input placeholder="e.g. 95.00" value={form.hourlyRate} onChange={(e) => set('hourlyRate', e.target.value)} /></label>
            <label className="field">Material Markup %<input placeholder="e.g. 15" value={form.materialMarkupPercent} onChange={(e) => set('materialMarkupPercent', e.target.value)} /></label>
            <label className="field">Material GP %<input placeholder="e.g. 30" value={form.materialGpPercent} onChange={(e) => set('materialGpPercent', e.target.value)} /></label>
          </div>
          <label className="field">Notes<textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={4} /></label>
        </section>

        {message && <p className="message">{message}</p>}
        <div className="actions-row">
          <button className="ghost-btn" type="button" onClick={() => setForm(initialData)}>Reset</button>
          <button className="form-btn" type="submit">Save Customer</button>
        </div>
      </form>
    </main>
  );
}
