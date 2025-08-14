import { createFileRoute } from '@tanstack/react-router';
import { RefreshCcw, Calendar, BarChart3 } from 'lucide-react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

function DashboardIndexPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Latest Snapshot Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <RefreshCcw className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Latest snapshot</span>
            </div>
            <span className="text-sm text-gray-500">Uploaded on 17 Jul 2025 2:20 AM</span>
          </div>

          <div className="flex items-center justify-end mb-8">
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>USDC</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br bg-gray-50  rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Balance</h3>
              <p className="text-3xl font-bold text-gray-900">222.89 USDC</p>
            </div>
            <div className="bg-gradient-to-br bg-gray-50  rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Available to transfer</h3>
              <p className="text-3xl font-bold text-gray-900">7.68 USDC</p>
            </div>
            <div className="bg-gradient-to-br bg-gray-50  rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Available in 7 days</h3>
              <p className="text-3xl font-bold text-gray-900">215.21 USDC</p>
            </div>
            <div className="bg-gradient-to-br bg-gray-50  rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Reserved</h3>
              <p className="text-3xl font-bold text-gray-900">0.00 USDC</p>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview</h2>

          {/* 7-day metrics row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50  rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">7-day Transaction Volume</h3>
              <p className="text-2xl font-bold text-gray-900">$0.25</p>
            </div>
            <div className="bg-gray-50  rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">7-day Refund Volume</h3>
              <p className="text-2xl font-bold text-gray-900">$0.06</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Number of transactions in 7 days
              </h3>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>

          {/* Today's metrics row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50  rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Today's Transaction Volume</h3>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div className="bg-gray-50  rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Today's Refund Volume</h3>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div className="bg-gray-50  rounded-xl p-6 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Number of Transaction Today
              </h3>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>

        {/* Transaction/Refund Amount Chart Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Transaction/Refund Amount</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Within 30 days</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="2025-06-29"
                />
                <span className="text-sm text-gray-500">to</span>
                <div className="relative">
                  <input
                    type="date"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                    defaultValue="2025-07-05"
                  />
                  <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Stores</option>
              </select>
            </div>
          </div>

          {/* Chart Container */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" strokeWidth={1} />
                <p className="text-gray-500 text-sm">
                  Chart placeholder - Transaction/Refund Amount visualization
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Blue line: Transaction Amount | Gray line: Refund Amount
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndexPage,
});
