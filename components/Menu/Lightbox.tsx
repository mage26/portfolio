import Link from 'next/link';
import CloseIcon from '@/icons/Close';
import { FocusTrap } from 'focus-trap-react';

type Props = {
    visible: boolean;
    onClose: () => void;
}

export default function Lightbox({ 
    visible,
    onClose, 
}: Props) {
    return (
    <FocusTrap active={visible}>
        <div 
            className="fixed flex size-full transition-all bg-black md:hidden justify-center items-center font-bold text-2xl flex-col z-1001 gap-8 translate-x-full data-[visible=true]:translate-x-0 opacity-0 data-[visible=true]:opacity-100 data-[visible=true]:md:hidden"
            data-visible={visible}
        >
            <button type="button" className="absolute top-5 right-5 size-12 cursor-pointer" onClick={() => onClose()}>
                <CloseIcon />
            </button>
            <Link href="/" onClick={() => onClose()}>HOME</Link>
            <Link href="/work-history" onClick={() => onClose()}>WORK HISTORY</Link>
            <Link href="/projects" onClick={() => onClose()}>PROJECTS</Link>
            <Link href="/contact" onClick={() => onClose()}>CONTACT ME</Link>
        </div>
    </FocusTrap>
    );
}