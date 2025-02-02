import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href='/' className="md:flex-1 flex items-center">
        <div className="hidden md:flex items-center gap-2">
          <Image
            src="/assets/icons/MyDocs.png"
            alt="MyDocs Logo"
            width={32}
            height={32}
          />
          <span className="text-white text-xl font-semibold">MyDocs</span>
        </div>
        <div className="md:hidden">
          <Image
            src="/assets/icons/MyDocs.png"
            alt="MyDocs Logo"
            width={32}
            height={32}
            className="mr-2"
          />
        </div>
      </Link>
      {children}
    </div>
  )
}

export default Header