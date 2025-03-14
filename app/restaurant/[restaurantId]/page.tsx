// app/restaurant/[restaurantId]/page.jsx
'use client'
import { useParams } from 'next/navigation';

export default function Restaurant() {
  const { restaurantId } = useParams(); // Access the dynamic 'restaurantId' from the URL

  return (
    <div>
      <h1>Restaurant ID: {restaurantId}</h1>
      <p>Here is the information for restaurant number {restaurantId}.</p>
    </div>
  );
}
