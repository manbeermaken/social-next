"use client"

import { Target } from "lucide-react"
import Logout from "./Logout"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { useState } from "react"
import Link from "next/link"

const Navbar = () => {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    if (current > previous && current > 64) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.div className="w-full fixed flex items-center top-0 z-50 bg-white h-14 md:hidden"
      animate={{
        y: hidden ? -64 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }} >
      <div className="flex w-full justify-between mx-4">
        <motion.div className="cursor-pointer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.9, y: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          <Link href={'/'} prefetch={false}><Target /></Link>
        </motion.div>
        <Logout />
      </div>
    </motion.div >
  )
}

export default Navbar