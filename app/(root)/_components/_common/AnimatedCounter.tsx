'use client';
import React from 'react';
import CountUp from 'react-countup';

export default function AnimatedCounter({ amount }: { amount: number }) {
  return (
    <CountUp
      prefix='$'
      end={amount}
      decimals={2}
    />
  );
}
