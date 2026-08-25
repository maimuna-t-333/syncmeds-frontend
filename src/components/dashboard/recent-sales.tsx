'use client';

const recentSales = [
    { id: 1, customer: 'John Doe', amount: 150.0, date: '2026-08-23', status: 'Completed' },
    { id: 2, customer: 'Jane Smith', amount: 89.5, date: '2026-08-22', status: 'Completed' },
    { id: 3, customer: 'Bob Johnson', amount: 230.0, date: '2026-08-22', status: 'Pending' },
    { id: 4, customer: 'Alice Brown', amount: 45.0, date: '2026-08-21', status: 'Completed' },
    { id: 5, customer: 'Charlie Wilson', amount: 120.75, date: '2026-08-21', status: 'Cancelled' },
];

export function RecentSales() {
    return (
        <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-900">
            <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentSales.map((sale) => (
                            <tr key={sale.id} className="border-b dark:border-gray-700">
                                <td className="px-4 py-3 font-medium">{sale.customer}</td>
                                <td className="px-4 py-3">${sale.amount.toFixed(2)}</td>
                                <td className="px-4 py-3 text-gray-500">{sale.date}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            sale.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : sale.status === 'Pending'
                                                  ? 'bg-yellow-100 text-yellow-800'
                                                  : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {sale.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
