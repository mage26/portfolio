'use client';

import { usePathname } from "next/navigation";
import useInView from '@/hooks/useInView';

export default function InViewAnimations() {
    const pathname = usePathname();
    useInView(pathname);

    return null;
}