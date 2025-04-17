import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import AlertItem from "@/components/alerts/AlertItem";
import MainLayout from "../components/layout/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AllAlerts: React.FC = () => {
  const { alerts } = useApp();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const sortedAlerts = [...alerts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const openModal = (alert) => {
    setSelectedAlert(alert);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedAlert(null);
  };

  return (
    <MainLayout title="All Alerts">
      <div className="px-4 py-2">
        {sortedAlerts.length > 0 ? (
          <div className="divide-y bg-white shadow-sm rounded-lg overflow-hidden">
            <AnimatePresence>
              {sortedAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openModal(alert)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <AlertItem alert={alert} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center">
            No alerts available.
          </p>
        )}

        {/* Modal for displaying full alert content */}
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-start justify-center p-4 min-h-full">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-[-20px]"
                  enterTo="opacity-100 translate-y-0"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-[-20px]"
                >
                  <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative mt-10">
                    {/* Close button at top right */}
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 pr-6"
                    >
                      {selectedAlert?.title || "Notification"}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {selectedAlert?.message}
                      </p>
                    </div>

                    {/* Additional alert details can be added here */}
                    {selectedAlert?.date && (
                      <div className="mt-4 text-xs text-gray-400">
                        {new Date(selectedAlert.date).toLocaleString()}
                      </div>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </MainLayout>
  );
};

export default AllAlerts;
