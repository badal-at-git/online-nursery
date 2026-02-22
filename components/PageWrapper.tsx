'use client';

import React from 'react';
import ModernInteractive from './ModernInteractive';

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <>
            <ModernInteractive />
            {children}
        </>
    );
};

export default PageWrapper;
