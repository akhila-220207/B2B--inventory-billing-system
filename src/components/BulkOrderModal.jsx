import React, { useState } from 'react';
import { FaTimes, FaList, FaCheck, FaExclamationCircle } from 'react-icons/fa';

export default function BulkOrderModal({ isOpen, onClose, products, onAddBulk }) {
  const [inputText, setInputText] = useState('');
  const [parsedResults, setParsedResults] = useState([]);
  const [step, setStep] = useState('input'); // 'input' | 'review'

  if (!isOpen) return null;

  const handleParse = () => {
    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    const results = lines.map(line => {
      let parsedName = line.trim();
      let parsedQty = 1;

      // Regex to extract digits
      const qtyMatch = line.match(/(\d+)/);
      if (qtyMatch) {
        parsedQty = parseInt(qtyMatch[1], 10);
        // remove the number and common units from the name
        parsedName = line.replace(qtyMatch[0], '')
                         .replace(/\b(kg|g|litre|litres|lt|l|pcs|pieces|boxes|box)\b/i, '')
                         .replace(/-/g, ' ')
                         .trim();
      }

      const lowerName = parsedName.toLowerCase();
      // Match by product name
      const matchedProduct = products.find(p => {
        const pName = p.name.toLowerCase();
        return pName.includes(lowerName) || lowerName.includes(pName);
      });

      return {
        rawLine: line,
        parsedName,
        parsedQty,
        matchedProduct
      };
    });

    setParsedResults(results);
    setStep('review');
  };

  const handleAdd = () => {
    const validItems = parsedResults.filter(r => r.matchedProduct);
    onAddBulk(validItems);
    handleClose();
  };

  const handleClose = () => {
    setInputText('');
    setParsedResults([]);
    setStep('input');
    onClose();
  };

  const validCount = parsedResults.filter(r => r.matchedProduct).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FaList className="text-blue-600 text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Bulk Order</h2>
              <p className="text-sm text-gray-500">Paste your list to add multiple items instantly</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition">
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'input' ? (
            <div className="flex flex-col h-full">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Paste your product list here:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={"Example:\nrice 2kg\noil 1 litre\nsugar 3"}
                className="w-full h-64 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-gray-700">Review Items</h3>
              
              <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 bg-white">
                {parsedResults.map((res, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 ${res.matchedProduct ? 'bg-green-50/30' : 'bg-red-50/30'}`}>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-mono mb-1">"{res.rawLine}"</p>
                      {res.matchedProduct ? (
                        <p className="text-sm font-semibold text-gray-800">
                          {res.matchedProduct.name}
                        </p>
                      ) : (
                        <p className="text-sm font-semibold text-red-500 flex items-center gap-1">
                          <FaExclamationCircle /> No matching product found for "{res.parsedName}"
                        </p>
                      )}
                    </div>
                    {res.matchedProduct && (
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Qty</p>
                          <p className="text-sm font-bold text-gray-800">{res.parsedQty}</p>
                        </div>
                        <div className="text-right w-24">
                          <p className="text-xs text-gray-500">Price/Unit</p>
                          <p className="text-sm font-semibold text-green-600">₹{res.matchedProduct.price}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
          {step === 'input' ? (
            <>
              <button 
                onClick={handleClose}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleParse}
                disabled={!inputText.trim()}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center gap-2 transition"
              >
                Review List
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setStep('input')}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-xl transition mr-auto"
              >
                Back to Edit
              </button>
              <button 
                onClick={handleClose}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleAdd}
                disabled={validCount === 0}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center gap-2 transition shadow-sm hover:shadow"
              >
                <FaCheck /> Add {validCount} Items to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
