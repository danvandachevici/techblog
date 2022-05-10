import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Menu() {

  let [token, setToken] = useState('');

  return (
    <nav>
      <ul>
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/posts'>Latest</Link></li>
      </ul>
    </nav>
  )
}