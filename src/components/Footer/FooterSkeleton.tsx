import React from 'react';
import { Skeleton } from '@/components/Skeleton';

export default function FooterSkeleton() {
    return (
        <div>
            <Skeleton className="h-32 w-full mt-10" />
        </div>
    )
}