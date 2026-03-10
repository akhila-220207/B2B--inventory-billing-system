import { FaTimes, FaBell, FaInfoCircle, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function Notifications({ isOpen, onClose, notifications = [] }) {
  if (!isOpen) return null;

  const getIcon = (status) => {
    switch (status) {
      case 'success': return <FaCheckCircle className="text-emerald-500" />;
      case 'warning': return <FaExclamationTriangle className="text-amber-500" />;
      default: return <FaInfoCircle className="text-blue-500" />;
    }
  };

  return (
    <div className="absolute right-0 top-14 bg-white shadow-2xl rounded-3xl w-80 max-h-[32rem] overflow-hidden z-[200] border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-3">
           <FaBell className="text-slate-400" />
           <h3 className="font-black text-slate-900 text-sm italic">Updates</h3>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors shadow-sm">
          <FaTimes size={12} />
        </button>
      </div>
      
      <div className="p-2 overflow-y-auto max-h-[26rem] no-scrollbar">
        {notifications.length === 0 ? (
          <div className="py-12 text-center">
             <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mx-auto mb-4">
                <FaBell size={20} />
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No new alerts</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id} className="p-4 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors group relative border border-transparent hover:border-slate-100 mb-1">
              <div className="flex gap-4">
                 <div className="mt-1 shrink-0 text-lg">
                    {getIcon(notif.status)}
                 </div>
                 <div>
                    <p className="text-xs font-bold text-slate-700 leading-relaxed mb-1">{notif.message}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{notif.time}</p>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-4 border-t border-slate-50">
           <button className="w-full py-3 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white transition-all">
              Mark all as read
           </button>
        </div>
      )}
    </div>
  );
}