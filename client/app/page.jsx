'use client';
import { Menu } from '@/components/Menu.jsx';
import { Site } from '@/components/Site.jsx';
import '@/app/styles/App.css';

export default function Home() {
  return (
    <div id="all">
      <Menu/>
      <Site/>
    </div>
  );
}
