import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
            <motion.img
                src="/logo.png"
                alt="Intellilock Logo"
                className="w-16 h-16 mx-auto mb-4 rounded-xl border border-gray-300"
                animate={{
                scale: [1, 1.2, 1],
                }}
                transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                }}
            />
        <h1 className="text-2xl font-bold text-gray-900">IntelliLock</h1>
        <p className="text-gray-600 mt-2">Securing your transactions</p>
      </div>
    </div>
  );
};

export default Loader;
