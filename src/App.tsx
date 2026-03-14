import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, CheckCircle2, ChevronRight, ArrowRight, RefreshCw, Layers, Target, AlertCircle, Lightbulb, FileText, Users, GitMerge, FileSignature, BookOpen, GraduationCap, Building2, Smartphone, CalendarDays, MessageSquare, Rocket, MonitorPlay, ClipboardCheck, Briefcase, Shuffle, X } from 'lucide-react';

type Step = 'intro' | 'theory' | 'example' | 'quiz' | 'summary';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('intro');

  const steps: Step[] = ['intro', 'theory', 'example', 'quiz', 'summary'];
  const currentIndex = steps.indexOf(currentStep);

  // Cuộn lên đầu trang mỗi khi chuyển bước
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight text-slate-800">Cẩm nang ITBA</h1>
              <p className="text-slate-500 text-xs font-medium">Chủ đề: Mô hình vận hành</p>
            </div>
          </div>
          <div className="hidden sm:flex gap-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`w-12 h-1.5 rounded-full transition-colors duration-500 ${
                  currentIndex >= index ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <IntroScreen key="intro" onNext={() => setCurrentStep('theory')} />
          )}
          {currentStep === 'theory' && (
            <TheoryScreen key="theory" onNext={() => setCurrentStep('example')} />
          )}
          {currentStep === 'example' && (
            <ExampleScreen key="example" onNext={() => setCurrentStep('quiz')} />
          )}
          {currentStep === 'quiz' && (
            <QuizScreen key="quiz" onNext={() => setCurrentStep('summary')} />
          )}
          {currentStep === 'summary' && (
            <SummaryScreen key="summary" onReset={() => setCurrentStep('intro')} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 text-center w-full min-h-[calc(100vh-4rem)]"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-blue-100">
          <Target className="w-4 h-4" /> Nguyên tắc cốt lõi
        </div>
        
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-10 leading-[1.2]">
          Xác định rõ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">mô hình vận hành</span> và <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">cách thức phối hợp</span> trước khi bắt tay vào làm.
        </h2>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-12 max-w-3xl text-justify">
          <p className="text-slate-600 text-lg leading-relaxed mb-4">
            Trong vai trò là một IT Business Analyst (ITBA), bạn chính là cầu nối giữa bài toán kinh doanh và giải pháp công nghệ. Việc không làm rõ dự án đang vận hành theo mô hình <strong>Waterfall (Thác nước)</strong> hay <strong>Agile (Linh hoạt)</strong> ngay từ đầu sẽ dẫn đến việc bạn chọn sai phương pháp, viết sai loại tài liệu, và gây ra xung đột với đội ngũ phát triển (Dev Team).
          </p>
        </div>
        
        <button
          onClick={onNext}
          className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-3 shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5"
        >
          Khám phá sự khác biệt
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

function TheoryScreen({ onNext }: { onNext: () => void }) {
  const [viewingModel, setViewingModel] = useState<'waterfall' | 'agile' | 'scrum' | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full p-6 py-12 flex flex-col"
    >
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6">Lý thuyết: Hai Trường Phái Vận Hành</h2>
        <p className="text-slate-600 max-w-3xl mx-auto text-lg text-justify md:text-center leading-relaxed">
          Dưới góc nhìn của một ITBA, mỗi mô hình đòi hỏi một bộ kỹ năng, cách thức quản lý tài liệu và tư duy tiếp cận hoàn toàn khác biệt. Hãy cùng tìm hiểu các khái niệm cốt lõi.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-16 items-stretch">
        {/* Waterfall Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="bg-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
              <Layers className="w-8 h-8 text-slate-700" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-slate-900">Waterfall (Thác nước)</h3>
              <p className="text-slate-500 font-medium">Tuyến tính & Chặt chẽ</p>
            </div>
          </div>
          
          <div className="space-y-6 flex-1 text-justify">
            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                <Compass className="w-5 h-5 text-blue-600" /> Triết lý vận hành
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Thực hiện tuần tự từng bước. Giai đoạn lấy yêu cầu (Requirements) phải được chốt cứng và "đóng băng" (freeze) hoàn toàn trước khi chuyển sang giai đoạn thiết kế và lập trình.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                <FileSignature className="w-5 h-5 text-blue-600" /> Output của ITBA
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Tài liệu đồ sộ và cực kỳ chi tiết. Bạn sẽ phải viết các tài liệu như <strong>BRD</strong> (Business Requirement Document), <strong>SRS</strong> (Software Requirements Specification). Bắt buộc phải có chữ ký phê duyệt (Sign-off) từ các bên liên quan trước khi Dev bắt đầu code.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                <GitMerge className="w-5 h-5 text-blue-600" /> Quản lý thay đổi
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Rất khắt khe. Mọi yêu cầu thay đổi phát sinh sau khi đã Sign-off đều phải đi qua quy trình <strong>Change Request (CR)</strong> phức tạp, đánh giá lại chi phí và thời gian.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setViewingModel('waterfall')} 
            className="mt-8 w-full py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <MonitorPlay className="w-5 h-5" /> Xem mô hình Waterfall
          </button>
        </div>

        {/* Agile Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-200 flex flex-col relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-blue-100 relative">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
              <RefreshCw className="w-8 h-8 text-blue-700" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-blue-950">Agile (Linh hoạt)</h3>
              <p className="text-blue-600 font-medium">Lặp lại & Tăng trưởng</p>
            </div>
          </div>
          
          <div className="space-y-6 flex-1 text-justify relative">
            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                <Compass className="w-5 h-5 text-blue-600" /> Triết lý vận hành
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Phân mảnh dự án thành các phân đoạn ngắn (<strong>Sprint</strong>, thường từ 2-4 tuần). Đội ngũ vừa làm, vừa kiểm tra, vừa điều chỉnh dựa trên phản hồi thực tế.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-600" /> Output của ITBA
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Tài liệu gọn nhẹ. BA quản lý <strong>Product Backlog</strong> (danh sách tính năng). Bạn sẽ viết các <strong>User Story</strong> ngắn gọn kèm theo <strong>Acceptance Criteria</strong> (Tiêu chí nghiệm thu) rõ ràng, và liên tục làm mịn yêu cầu cùng team.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" /> Quản lý thay đổi
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Chào đón sự thay đổi. Yêu cầu mới của khách hàng sẽ được đưa vào Backlog, đánh giá độ ưu tiên và có thể đưa ngay vào các Sprint tiếp theo.
              </p>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-3 relative z-10">
            <button 
              onClick={() => setViewingModel('agile')} 
              className="w-full py-3.5 rounded-xl bg-blue-100 text-blue-700 font-bold hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" /> Mô hình Agile
            </button>
            <button 
              onClick={() => setViewingModel('scrum')} 
              className="w-full py-3.5 rounded-xl bg-indigo-100 text-indigo-700 font-bold hover:bg-indigo-200 transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" /> Mô hình Scrum
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
        >
          Tiếp tục: Đào sâu vào ví dụ
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {viewingModel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setViewingModel(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-3">
                  {viewingModel === 'waterfall' && <><Layers className="w-6 h-6 text-slate-600" /> Mô hình Waterfall (Thác nước)</>}
                  {viewingModel === 'agile' && <><RefreshCw className="w-6 h-6 text-blue-600" /> Mô hình Agile (Linh hoạt)</>}
                  {viewingModel === 'scrum' && <><Users className="w-6 h-6 text-indigo-600" /> Mô hình Scrum & Các vai trò</>}
                </h3>
                <button onClick={() => setViewingModel(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto">
                {viewingModel === 'waterfall' && <WaterfallAnimation />}
                {viewingModel === 'agile' && <AgileAnimation />}
                {viewingModel === 'scrum' && <ScrumAnimation />}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function WaterfallAnimation() {
  const steps = [
    { name: 'Requirements', desc: 'Lấy yêu cầu & Phân tích', color: 'bg-slate-100 border-slate-300 text-slate-700' },
    { name: 'Design', desc: 'Thiết kế hệ thống & Kiến trúc', color: 'bg-slate-200 border-slate-400 text-slate-800' },
    { name: 'Implementation', desc: 'Lập trình & Tích hợp', color: 'bg-slate-300 border-slate-500 text-slate-900' },
    { name: 'Verification', desc: 'Kiểm thử (Testing)', color: 'bg-slate-400 border-slate-600 text-slate-950' },
    { name: 'Maintenance', desc: 'Bảo trì & Vận hành', color: 'bg-slate-500 border-slate-700 text-white' },
  ];

  return (
    <div className="flex flex-col items-center py-8 overflow-x-auto">
      <div className="min-w-[600px] flex flex-col items-center">
        {steps.map((step, index) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, y: -20, x: -50 }}
            animate={{ opacity: 1, y: 0, x: index * 40 - 80 }}
            transition={{ delay: index * 0.4, duration: 0.5 }}
            className={`w-72 p-5 rounded-2xl border-2 shadow-sm relative ${step.color} ${index > 0 ? '-mt-4' : ''}`}
            style={{ zIndex: steps.length - index }}
          >
            <div className="font-bold text-xl mb-1">{step.name}</div>
            <div className="text-sm opacity-90">{step.desc}</div>
            {index < steps.length - 1 && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 32, opacity: 1 }}
                transition={{ delay: index * 0.4 + 0.3, duration: 0.3 }}
                className="absolute -bottom-8 left-12 w-0.5 bg-slate-400"
              >
                <div className="absolute -bottom-1 -left-1.5 w-3 h-3 border-b-2 border-r-2 border-slate-400 transform rotate-45" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <p className="text-slate-500 text-center max-w-lg mt-12">
        Mô hình Thác nước chảy theo một chiều từ trên xuống. Không thể quay lại bước trước đó nếu không làm lại từ đầu.
      </p>
    </div>
  );
}

function AgileAnimation() {
  const cycleSteps = [
    { name: 'Plan', icon: ClipboardCheck },
    { name: 'Design', icon: Target },
    { name: 'Develop', icon: MonitorPlay },
    { name: 'Test', icon: CheckCircle2 },
    { name: 'Deploy', icon: Rocket },
    { name: 'Review', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col items-center py-8 overflow-x-auto">
      <div className="min-w-[800px] flex items-center justify-center gap-8 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-blue-50 border border-blue-200 p-5 rounded-2xl w-48 text-center shadow-sm"
        >
          <div className="font-bold text-blue-800 mb-4">Product Backlog</div>
          <div className="space-y-3">
            {[1,2,3,4].map((i, idx) => (
              <motion.div 
                key={i} 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: idx * 0.2 }}
                className="h-3 bg-blue-200 rounded-full w-full" 
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowRight className="w-8 h-8 text-blue-400" />
        </motion.div>

        <div className="relative w-72 h-72 flex-shrink-0">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-dashed border-blue-200"
          />
          
          {cycleSteps.map((step, index) => {
            const angle = (index * 360) / cycleSteps.length;
            const radius = 144; // half of 72 (288px)
            const x = Math.sin((angle * Math.PI) / 180) * radius;
            const y = -Math.cos((angle * Math.PI) / 180) * radius;
            
            const Icon = step.icon;

            return (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="absolute top-1/2 left-1/2 w-20 h-20 -ml-10 -mt-10 bg-white border-2 border-blue-500 rounded-full flex flex-col items-center justify-center shadow-lg"
                style={{ x, y }}
              >
                <Icon className="w-6 h-6 text-blue-600 mb-1" />
                <span className="text-[11px] font-bold text-blue-900">{step.name}</span>
              </motion.div>
            );
          })}

          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <RefreshCw className="w-12 h-12 text-blue-300 mb-2" />
            <span className="font-bold text-blue-800 text-lg">Sprint</span>
            <span className="text-sm text-blue-600 font-medium">1-4 Tuần</span>
          </div>
        </div>

        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
        >
          <ArrowRight className="w-8 h-8 text-blue-400" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl w-48 text-center shadow-sm"
        >
          <div className="font-bold text-emerald-800 mb-4">Working Software</div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Rocket className="w-12 h-12 text-emerald-500 mx-auto" />
          </motion.div>
          <div className="text-sm text-emerald-600 mt-2 font-medium">Sản phẩm tăng trưởng</div>
        </motion.div>
      </div>
      
      <p className="text-slate-500 text-center max-w-lg mt-4">
        Quy trình lặp lại (Iterative) giúp liên tục chuyển giao giá trị và dễ dàng thích ứng với thay đổi sau mỗi Sprint.
      </p>
    </div>
  );
}

function ScrumAnimation() {
  return (
    <div className="flex flex-col items-center py-4 overflow-x-auto">
      {/* Roles Section */}
      <div className="grid grid-cols-3 gap-6 mb-12 w-full max-w-5xl">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.1}} className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <div className="bg-amber-100 p-3 rounded-full mb-3"><Briefcase className="w-6 h-6 text-amber-700" /></div>
          <h4 className="font-bold text-amber-900 mb-2">Product Owner (PO)</h4>
          <p className="text-sm text-amber-800">Đại diện tiếng nói khách hàng. Quản lý Product Backlog và tối đa hóa giá trị sản phẩm.</p>
        </motion.div>
        
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.2}} className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <div className="bg-indigo-100 p-3 rounded-full mb-3"><Users className="w-6 h-6 text-indigo-700" /></div>
          <h4 className="font-bold text-indigo-900 mb-2">Scrum Master (SM)</h4>
          <p className="text-sm text-indigo-800">Người bảo vệ quy trình Scrum. Hỗ trợ team gỡ bỏ rào cản (Impediments) để làm việc hiệu quả.</p>
        </motion.div>
        
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.3}} className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <div className="bg-emerald-100 p-3 rounded-full mb-3"><MonitorPlay className="w-6 h-6 text-emerald-700" /></div>
          <h4 className="font-bold text-emerald-900 mb-2">Development Team</h4>
          <p className="text-sm text-emerald-800">Đội ngũ tự quản (Dev, QA, BA, Design...). Trực tiếp biến yêu cầu thành sản phẩm thực tế.</p>
        </motion.div>
      </div>

      {/* Flow Section */}
      <div className="flex items-center justify-center gap-4 min-w-[900px] bg-slate-50 p-8 rounded-3xl border border-slate-200">
         {/* Product Backlog */}
         <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.4}} className="flex flex-col items-center">
           <div className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">PO quản lý</div>
           <div className="w-32 h-40 bg-white border-2 border-slate-300 rounded-xl flex flex-col p-2 gap-2 shadow-sm">
             <div className="h-4 bg-amber-400 rounded w-full"></div>
             <div className="h-4 bg-amber-300 rounded w-5/6"></div>
             <div className="h-4 bg-amber-200 rounded w-full"></div>
             <div className="h-4 bg-slate-200 rounded w-4/5 mt-auto"></div>
           </div>
           <div className="font-bold text-slate-700 mt-3 text-center">Product<br/>Backlog</div>
         </motion.div>

         <ArrowRight className="w-6 h-6 text-slate-300" />

         {/* Sprint Planning */}
         <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay: 0.5}} className="bg-white border-2 border-indigo-200 p-3 rounded-xl flex flex-col items-center text-center w-28 shadow-sm">
           <ClipboardCheck className="w-6 h-6 text-indigo-600 mb-2" />
           <span className="text-xs font-bold text-indigo-900 mb-1">Sprint Planning</span>
           <span className="text-[10px] text-indigo-600 leading-tight">Toàn team<br/>chọn việc</span>
         </motion.div>

         <ArrowRight className="w-6 h-6 text-slate-300" />

         {/* Sprint Backlog */}
         <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.6}} className="flex flex-col items-center">
           <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">Dev Team cam kết</div>
           <div className="w-32 h-40 bg-white border-2 border-slate-300 rounded-xl flex flex-col p-2 gap-2 shadow-sm">
             <div className="h-4 bg-emerald-400 rounded w-full"></div>
             <div className="h-4 bg-emerald-300 rounded w-5/6"></div>
             <div className="h-4 bg-emerald-200 rounded w-full"></div>
           </div>
           <div className="font-bold text-slate-700 mt-3 text-center">Sprint<br/>Backlog</div>
         </motion.div>

         <ArrowRight className="w-6 h-6 text-slate-300" />

         {/* Sprint Execution */}
         <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay: 0.7}} className="relative w-48 h-48 flex items-center justify-center mx-2">
           <motion.div animate={{rotate:360}} transition={{repeat:Infinity, duration:8, ease:"linear"}} className="absolute inset-0 border-4 border-dashed border-indigo-300 rounded-full" />
           <div className="flex flex-col items-center text-center bg-white p-5 rounded-full shadow-md z-10 border-2 border-indigo-100">
             <RefreshCw className="w-8 h-8 text-indigo-600 mb-1" />
             <span className="font-bold text-indigo-900 text-lg">Sprint</span>
             <span className="text-xs text-indigo-600 font-medium">1-4 Tuần</span>
           </div>
           {/* Daily Scrum */}
           <motion.div animate={{scale:[1, 1.1, 1]}} transition={{repeat:Infinity, duration:2}} className="absolute -top-3 -right-3 w-16 h-16 bg-indigo-100 border-2 border-indigo-400 rounded-full flex flex-col items-center justify-center shadow-lg z-20">
             <MessageSquare className="w-5 h-5 text-indigo-700 mb-0.5" />
             <span className="text-[9px] font-bold text-indigo-900 leading-tight text-center">Daily<br/>Scrum</span>
           </motion.div>
         </motion.div>

         <ArrowRight className="w-6 h-6 text-slate-300" />

         {/* Increment */}
         <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay: 0.8}} className="flex flex-col items-center">
           <div className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">Kết quả</div>
           <div className="w-32 h-40 bg-white border-2 border-blue-300 rounded-xl flex items-center justify-center shadow-sm">
             <Rocket className="w-12 h-12 text-blue-500" />
           </div>
           <div className="font-bold text-slate-700 mt-3 text-center">Increment<br/>(Sản phẩm)</div>
         </motion.div>
      </div>
    </div>
  );
}

function ExampleScreen({ onNext }: { onNext: () => void }) {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3>(0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full p-6 py-12 flex flex-col"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-4">
          <Lightbulb className="w-6 h-6" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6">Đào sâu ví dụ thực tế</h2>
        <p className="text-slate-600 max-w-3xl mx-auto text-lg text-justify md:text-center leading-relaxed">
          Từ ví dụ đời sống đến các dự án phần mềm thực tế tại doanh nghiệp, hãy xem cách ITBA làm việc trong từng mô hình diễn ra cụ thể như thế nào dưới góc nhìn chuyên môn.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveTab(0)}
          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 0 
              ? 'bg-slate-900 text-white shadow-md' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 1. Khóa học
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 1 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" /> 2. Waterfall
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 2 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Smartphone className="w-4 h-4" /> 3. Agile/Scrum
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 3 
              ? 'bg-purple-600 text-white shadow-md' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" /> 4. Thực tế (Hybrid)
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-16 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="tab0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid lg:grid-cols-2 gap-8 items-stretch"
            >
              {/* Waterfall Example */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="w-6 h-6 text-slate-700" />
                  <h3 className="text-xl font-display font-bold text-slate-900">Cách làm Waterfall: Soạn trọn gói</h3>
                </div>
                <div className="space-y-4 text-slate-600 text-justify leading-relaxed flex-1">
                  <p>
                    <strong>Giai đoạn 1 (Phân tích & Thiết kế tổng thể):</strong> Bạn dành trọn 6 tháng để soạn chi tiết toàn bộ 100 bài giảng, in sách, và quay video xong xuôi. Mọi thứ được chốt cứng từ đầu (tương đương việc chốt tài liệu <strong>BRD/SRS</strong>).
                  </p>
                  <p>
                    <strong>Giai đoạn 2 (Triển khai & Giảng dạy):</strong> Bạn bắt đầu tuyển sinh và cho học viên vào học theo đúng giáo trình đã in.
                  </p>
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 mt-4 text-red-800">
                    <strong>Rủi ro khi phát sinh thay đổi:</strong> Dạy đến bài 10, học viên phản hồi giáo trình quá khó. Lúc này, để sửa lại từ bài 11 đến 100, bạn phải hủy toàn bộ sách đã in và quay lại video từ đầu. Quá trình này cực kỳ tốn kém và phá vỡ kế hoạch ban đầu.
                  </div>
                </div>
              </div>

              {/* Agile Example */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-200 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <RefreshCw className="w-6 h-6 text-blue-700" />
                  <h3 className="text-xl font-display font-bold text-blue-950">Cách làm Agile: Cuốn chiếu từng phần</h3>
                </div>
                <div className="space-y-4 text-slate-600 text-justify leading-relaxed flex-1">
                  <p>
                    <strong>Giai đoạn 1 (Lập kế hoạch phân đoạn):</strong> Bạn không soạn hết 100 bài, mà chỉ lên khung chương trình và soạn chi tiết 4 bài đầu tiên của Unit 1 (tương đương việc viết <strong>User Story</strong> cho một Sprint).
                  </p>
                  <p>
                    <strong>Phân đoạn 1 (Sprint 1):</strong> Cho lớp học ngay Unit 1. Học viên học xong góp ý: <em>"Cần nhiều trò chơi tương tác hơn"</em>. Bạn ghi nhận yêu cầu này vào danh sách công việc (<strong>Product Backlog</strong>).
                  </p>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 mt-4 text-green-800">
                    <strong>Thích ứng và Cải tiến liên tục:</strong> Sang <strong>Phân đoạn 2 (Sprint 2)</strong>, khi bắt đầu soạn Unit 2, bạn lập tức bổ sung thêm nhiều trò chơi dựa trên phản hồi vừa rồi. Khóa học liên tục được tinh chỉnh để mang lại giá trị cao nhất cho học viên.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="tab1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-blue-200 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                  <Building2 className="w-7 h-7 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">Dự án Phần mềm (Waterfall)</h3>
                  <p className="text-slate-500 font-medium">Tình huống: Xây dựng hệ thống Quản lý nhân sự (HRM) cho một Tập đoàn lớn.</p>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 mb-8">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" /> Tại sao lại chọn Waterfall cho dự án này?
                </h4>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-2 leading-relaxed">
                  <li><strong>Nghiệp vụ rõ ràng, ít biến động:</strong> Quy trình tính lương, chấm công, bảo hiểm của tập đoàn đã có sẵn quy định chuẩn, hiếm khi thay đổi liên tục.</li>
                  <li><strong>Yêu cầu độ chính xác tuyệt đối:</strong> Liên quan đến tiền bạc và pháp lý nên cần phân tích cực kỳ kỹ lưỡng và chốt chặt chẽ từ đầu, không thể "vừa làm vừa sửa".</li>
                  <li><strong>Ngân sách & Thời gian cố định:</strong> Ban giám đốc cần biết chính xác dự án tốn bao nhiêu tiền và bao giờ xong để duyệt chi ngân sách năm.</li>
                </ul>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                
                {/* Step 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-blue-100 text-blue-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <FileSignature className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-1">Tháng 1-2: Khảo sát & Phân tích (Requirement Gathering)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed text-justify">ITBA làm việc với các bên liên quan (Stakeholders) như Giám đốc nhân sự, Kế toán để thống nhất nghiệp vụ. Sau đó, ITBA soạn thảo tài liệu Đặc tả Yêu cầu Phần mềm (<strong>SRS - Software Requirement Specification</strong>) dài 300 trang mô tả chi tiết mọi tính năng.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-blue-100 text-blue-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-1">Tháng 3: Ký duyệt & Đóng băng (Sign-off & Baseline)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed text-justify">Khách hàng và đội dự án chính thức ký duyệt tài liệu SRS. Từ thời điểm này, phạm vi dự án (Scope) bị <strong>"đóng băng" (Baseline)</strong>. Đội ngũ kỹ thuật (Dev Team) bắt đầu nhận tài liệu để thiết kế kiến trúc và cơ sở dữ liệu.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-slate-100 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <MonitorPlay className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-1">Tháng 4-8: Thiết kế & Lập trình (Design & Development)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed text-justify">Dev Team tiến hành code ròng rã 5 tháng bám sát 100% theo tài liệu SRS. Trong suốt giai đoạn này, khách hàng hoàn toàn không tham gia và không thấy được hình hài phần mềm thực tế.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-red-100 text-red-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-red-100 bg-red-50 shadow-sm">
                    <h4 className="font-bold text-red-800 mb-1">Tháng 9: Kiểm thử chấp nhận (UAT - User Acceptance Testing)</h4>
                    <p className="text-sm text-red-700 leading-relaxed text-justify">Khách hàng lần đầu tiên được trải nghiệm hệ thống thực tế. Tuy nhiên, họ phát hiện ra quy trình duyệt nghỉ phép của công ty đã thay đổi từ tháng 6. Hệ thống vừa xây xong đã trở nên lỗi thời so với thực tế kinh doanh!</p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-orange-100 text-orange-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <GitMerge className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-orange-100 bg-orange-50 shadow-sm">
                    <h4 className="font-bold text-orange-800 mb-1">Tháng 10: Quản lý thay đổi (Change Request - CR)</h4>
                    <p className="text-sm text-orange-700 leading-relaxed text-justify">Để cập nhật quy trình mới, ITBA phải thực hiện quy trình <strong>Change Request</strong>: phân tích lại tác động (Impact Analysis), báo giá chi phí và thời gian phát sinh. Hai bên phải đàm phán và ký duyệt lại, gây trễ tiến độ và đội vốn dự án.</p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="tab2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-200 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                  <Smartphone className="w-7 h-7 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">Dự án Phần mềm (Agile/Scrum)</h3>
                  <p className="text-slate-500 font-medium">Tình huống: Xây dựng App Đặt đồ ăn (Food Delivery) cho một Startup.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                    <Compass className="w-5 h-5" /> Agile và Scrum khác nhau thế nào?
                  </h4>
                  <p className="text-sm text-emerald-800 leading-relaxed text-justify">
                    <strong>Agile</strong> là một <em>hệ tư tưởng/triết lý</em> (nhanh nhẹn, linh hoạt, thích ứng). <br/><br/>
                    <strong>Scrum</strong> là một <em>phương pháp/khung làm việc cụ thể</em> (có Sprint, có họp hành, có phân vai) để thực hành triết lý Agile đó. Giống như "Ăn kiêng" là triết lý, còn "Keto" hay "Eat Clean" là phương pháp cụ thể.
                  </p>
                </div>
                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" /> Tại sao chọn Agile/Scrum?
                  </h4>
                  <ul className="list-disc list-inside text-sm text-emerald-800 space-y-2 leading-relaxed">
                    <li><strong>Thị trường biến động nhanh:</strong> Cần ra mắt sản phẩm sớm (MVP) để xem phản ứng của người dùng, không thể chờ 6 tháng mới ra app vì đối thủ sẽ chiếm mất thị phần.</li>
                    <li><strong>Yêu cầu chưa rõ ràng từ đầu:</strong> Khách hàng chỉ có ý tưởng chung chung, cần làm thử, nhìn thấy app thật rồi mới biết mình muốn thêm/bớt tính năng gì.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                
                {/* Step 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-1">Ngày 1: Lập kế hoạch Sprint (Sprint Planning)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed text-justify">Product Owner (PO) và ITBA đã chuẩn bị sẵn <strong>Product Backlog</strong> (danh sách tính năng được ưu tiên). Toàn bộ Scrum Team họp để chọn ra các <strong>User Story</strong> quan trọng nhất đưa vào <strong>Sprint Backlog</strong> (VD: Đăng nhập, Xem danh sách quán) để cam kết hoàn thành trong Sprint kéo dài 2 tuần.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-1">Ngày 2 - 13: Thực thi & Họp đồng bộ (Daily Scrum)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed text-justify">Đội Dev tiến hành lập trình và kiểm thử. Mỗi sáng, toàn đội họp đứng 15 phút (<strong>Daily Scrum</strong>) để đồng bộ tiến độ: <em>"Hôm qua làm gì? Hôm nay làm gì? Có khó khăn (Impediments) nào không?"</em>. ITBA liên tục hỗ trợ làm rõ yêu cầu (Refinement) ngay khi Dev cần.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <MonitorPlay className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-emerald-100 bg-emerald-50 shadow-sm">
                    <h4 className="font-bold text-emerald-800 mb-1">Ngày 14: Đánh giá & Trình diễn (Sprint Review)</h4>
                    <p className="text-sm text-emerald-700 leading-relaxed text-justify">Cuối Sprint, đội dự án trình diễn (Demo) phần mềm thực tế (đã chạy được tính năng Đăng nhập & Xem quán) cho khách hàng và các Stakeholders. Khách hàng dùng thử và phản hồi: <em>"Giao diện tốt, nhưng tôi muốn có thêm nút Lưu quán yêu thích"</em>.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-emerald-100 bg-emerald-50 shadow-sm">
                    <h4 className="font-bold text-emerald-800 mb-1">Ngày 15: Cải tiến & Thích ứng (Sprint Retrospective)</h4>
                    <p className="text-sm text-emerald-700 leading-relaxed text-justify">Scrum Team họp nội bộ (<strong>Retrospective</strong>) để rút kinh nghiệm về cách làm việc. Đồng thời, PO/ITBA cập nhật yêu cầu <em>"Lưu quán yêu thích"</em> vào Product Backlog. Sprint 2 lập tức bắt đầu: Team vừa phát triển tính năng mới (Giỏ hàng), vừa điều chỉnh giao diện theo đúng phản hồi của khách hàng.</p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 3 && (
            <motion.div
              key="tab3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-purple-200 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                  <Shuffle className="w-7 h-7 text-purple-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">Thực tế Doanh nghiệp: Mô hình Lai (Hybrid)</h3>
                  <p className="text-slate-500 font-medium">Lời khuyên sống còn: Không có ranh giới tuyệt đối giữa các mô hình</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                  <h4 className="font-bold text-purple-900 text-lg mb-3 flex items-center gap-2">
                    <GitMerge className="w-5 h-5" />
                    1. Tình huống thực tế: Water-Scrum-Fall
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-justify mb-3">
                    <strong>Tình huống:</strong> Công ty bạn làm dự án phần mềm (Outsource) cho một Ngân hàng lớn.
                  </p>
                  <p className="text-slate-700 leading-relaxed text-justify">
                    <strong>Lý do chọn Hybrid:</strong> Ngân hàng (Khách hàng) có quy trình tài chính nghiêm ngặt, họ bắt buộc phải biết <em>"Dự án này tốn bao nhiêu tỷ? Bao giờ xong? Tính năng cụ thể là gì?"</em> trước khi ký hợp đồng giải ngân. Do đó, giai đoạn đầu bắt buộc phải dùng <strong>Waterfall</strong> (Khảo sát, viết tài liệu chi tiết, chốt phạm vi).
                    <br/><br/>
                    Tuy nhiên, nếu đội Dev cũng làm theo Waterfall (code 6 tháng không ai xem) thì rủi ro lỗi hệ thống rất cao. Nên khi bắt tay vào làm, đội Dev sẽ áp dụng <strong>Scrum</strong>: chia nhỏ công việc thành các Sprint 2 tuần để dễ kiểm soát tiến độ, test liên tục và đảm bảo chất lượng. Sự kết hợp này gọi là Water-Scrum-Fall.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-600" />
                    2. Trộn lẫn công cụ: User Story + Use Case
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-justify">
                    Lý thuyết thường dạy: <em>"Agile thì dùng User Story, Waterfall thì dùng Use Case"</em>. Thực tế làm việc, một ITBA giỏi sẽ dùng cả hai!
                    <br/><br/>
                    <strong>Cách làm:</strong> Bạn dùng <strong>User Story</strong> để tóm tắt tính năng ngắn gọn, giúp khách hàng và team dễ hiểu mục tiêu (VD: <em>"Là người dùng, tôi muốn đăng nhập bằng FaceID để đỡ phải nhớ mật khẩu"</em>). Nhưng đính kèm bên trong User Story đó, bạn vẫn vẽ <strong>Use Case</strong> hoặc viết kịch bản chi tiết (Flow/Acceptance Criteria) để Dev biết chính xác lúc lỗi mạng thì báo gì, sai mặt thì khóa tài khoản ra sao.
                  </p>
                </div>

                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                  <h4 className="font-bold text-amber-900 text-lg mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-600" />
                    3. Lời khuyên cho ITBA mới vào nghề
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-justify">
                    Đừng rập khuôn máy móc! Đừng bao giờ cãi sếp hay Dev rằng: <em>"Sách dạy làm Agile là không được viết tài liệu dài"</em>. 
                    <br/><br/>
                    Mô hình (Agile/Waterfall) hay công cụ (User Story/Use Case) sinh ra là để <strong>phục vụ dự án</strong>, chứ không phải dự án phục vụ mô hình. Mục tiêu tối thượng của ITBA là: <strong>Giúp Team hiểu đúng yêu cầu, Dev code mượt mà, và Khách hàng nhận được phần mềm chạy tốt.</strong> Hãy linh hoạt sử dụng bất cứ công cụ nào giúp bạn đạt được mục tiêu đó!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
        >
          Tiếp tục: Phân tích tình huống thực tế
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

function QuizScreen({ onNext }: { onNext: () => void }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios = [
    {
      text: "Bạn làm BA cho một dự án của Bộ Y Tế. Họ muốn làm phần mềm quản lý hồ sơ bệnh án toàn quốc. Mọi quy trình khám chữa bệnh đều phải tuân thủ nghiêm ngặt theo Luật Khám bệnh, chữa bệnh. Hợp đồng đã ký chốt giá 10 tỷ, thời gian làm 1 năm. Nếu làm sai luật, công ty bạn sẽ bị phạt rất nặng.",
      correct: 'waterfall',
      explanation: "Dự án nhà nước, liên quan đến luật pháp, ngân sách cố định và rủi ro cao thì BẮT BUỘC phải dùng Waterfall. Bạn sẽ phải cẩn thận viết tài liệu SRS thật chi tiết, đưa cho các chuyên gia y tế ký duyệt (Sign-off) từng trang một rồi mới dám cho lập trình viên bắt đầu code."
    },
    {
      text: "Bạn làm BA cho một công ty khởi nghiệp (Startup). Giám đốc bảo: 'Anh muốn làm một app học Tiếng Anh cho trẻ em. Anh chưa biết tụi nhỏ thích học qua việc xem video hay chơi game. Em cứ làm thử phần chơi game trước, tháng sau tung ra thị trường xem tụi nhỏ có thích không. Nếu thích thì làm tiếp, không thì mình bỏ đi làm phần video'.",
      correct: 'agile',
      explanation: "Đây là đặc trưng của Agile. Vì chưa biết thị trường thích gì, bạn không thể ngồi viết tài liệu BRD/SRS trong 6 tháng được. Bạn phải viết User Story thật nhanh cho một tính năng nhỏ (chơi game), đưa Dev làm trong 1 Sprint, tung ra thị trường đo lường phản hồi, rồi mới quyết định làm gì tiếp theo."
    }
  ];

  const currentScenario = scenarios[scenarioIndex];

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const handleNextScenario = () => {
    if (scenarioIndex < scenarios.length - 1) {
      setScenarioIndex(scenarioIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="max-w-4xl mx-auto w-full p-6 py-12 flex flex-col justify-center min-h-[calc(100vh-4rem)]"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-indigo-500 uppercase tracking-wider mb-2">
          Tình huống thực tiễn {scenarioIndex + 1}/{scenarios.length}
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
          Dưới góc độ ITBA, bạn tư vấn chọn mô hình nào?
        </h2>
      </div>

      <div className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl mb-10 text-lg md:text-xl text-slate-700 leading-relaxed shadow-sm relative text-justify">
        <div className="absolute top-0 left-8 -translate-y-1/2 bg-white px-2 text-slate-300">
          <span className="text-4xl font-serif">"</span>
        </div>
        {currentScenario.text}
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => handleAnswer('waterfall')}
          disabled={showFeedback}
          className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 ${
            selectedAnswer === 'waterfall'
              ? currentScenario.correct === 'waterfall'
                ? 'border-green-500 bg-green-50 shadow-md shadow-green-500/10'
                : 'border-red-500 bg-red-50'
              : showFeedback && currentScenario.correct === 'waterfall'
              ? 'border-green-500 bg-green-50 opacity-60'
              : 'border-slate-200 hover:border-blue-500 hover:shadow-md bg-white'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <Layers className={`w-6 h-6 ${selectedAnswer === 'waterfall' ? 'text-current' : 'text-slate-400'}`} />
            <div className="font-display font-bold text-2xl">Waterfall</div>
          </div>
          <div className="text-slate-500 text-justify">Phù hợp dự án luật pháp chặt chẽ, chốt hợp đồng cứng, sợ rủi ro.</div>
        </button>

        <button
          onClick={() => handleAnswer('agile')}
          disabled={showFeedback}
          className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 ${
            selectedAnswer === 'agile'
              ? currentScenario.correct === 'agile'
                ? 'border-green-500 bg-green-50 shadow-md shadow-green-500/10'
                : 'border-red-500 bg-red-50'
              : showFeedback && currentScenario.correct === 'agile'
              ? 'border-green-500 bg-green-50 opacity-60'
              : 'border-slate-200 hover:border-blue-500 hover:shadow-md bg-white'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <RefreshCw className={`w-6 h-6 ${selectedAnswer === 'agile' ? 'text-current' : 'text-slate-400'}`} />
            <div className="font-display font-bold text-2xl">Agile</div>
          </div>
          <div className="text-slate-500 text-justify">Phù hợp dự án Startup, cần làm nhanh, thử nghiệm và sửa đổi liên tục.</div>
        </button>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            className={`p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
              selectedAnswer === currentScenario.correct 
                ? 'bg-green-100/50 border border-green-200 text-green-900' 
                : 'bg-red-100/50 border border-red-200 text-red-900'
            }`}
          >
            <div className="flex-1">
              <div className="font-bold text-lg mb-3 flex items-center gap-2">
                {selectedAnswer === currentScenario.correct ? (
                  <><CheckCircle2 className="w-6 h-6 text-green-600" /> Phân tích chính xác!</>
                ) : (
                  <><AlertCircle className="w-6 h-6 text-red-600" /> Phân tích chưa phù hợp</>
                )}
              </div>
              <p className="text-current/90 leading-relaxed text-justify">
                {selectedAnswer === currentScenario.correct 
                  ? <span className="font-semibold">Tuyệt vời! </span> 
                  : <span className="font-semibold">Thực ra: </span>}
                {currentScenario.explanation}
              </p>
            </div>
            <button
              onClick={handleNextScenario}
              className={`shrink-0 px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-transform hover:-translate-y-0.5 ${
                selectedAnswer === currentScenario.correct
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                  : 'bg-red-600 text-white shadow-lg shadow-red-600/20'
              }`}
            >
              {scenarioIndex < scenarios.length - 1 ? 'Tình huống tiếp' : 'Xem đúc kết'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SummaryScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full p-6 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center"
    >
      <div className="bg-blue-100 p-5 rounded-full mb-8">
        <Target className="w-12 h-12 text-blue-600" />
      </div>
      
      <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-8">
        Đúc kết dành cho ITBA
      </h2>
      
      <div className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl w-full text-left mb-10 shadow-sm">
        <p className="text-xl text-slate-800 mb-8 font-medium leading-relaxed text-justify">
          Tóm lại, trước khi bắt đầu công việc của một BA, bạn chỉ cần hỏi Quản lý dự án (PM): <em>"Dự án này mình chạy theo Waterfall hay Agile hả anh/chị?"</em>. Câu trả lời sẽ quyết định:
        </p>
        <ul className="space-y-8">
          <li className="flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-2xl shrink-0 mt-0.5">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-justify">
              <strong className="block text-lg text-slate-900 mb-2">Định hình loại tài liệu cần viết</strong>
              <span className="text-slate-600 leading-relaxed">Nếu là Waterfall, bạn phải chuẩn bị tâm lý viết những cuốn <strong>BRD/SRS</strong> dày cộm, vẽ Use Case Diagram chi tiết đến từng ngóc ngách. Nếu là Agile, bạn cần rèn luyện kỹ năng viết <strong>User Story</strong> ngắn gọn, súc tích và định nghĩa <strong>Acceptance Criteria</strong> thật sắc bén.</span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-2xl shrink-0 mt-0.5">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-justify">
              <strong className="block text-lg text-slate-900 mb-2">Quản lý kỳ vọng của khách hàng</strong>
              <span className="text-slate-600 leading-relaxed">Trong Waterfall, bạn phải "ép" khách hàng suy nghĩ thật kỹ và chốt yêu cầu, vì thay đổi sau này sẽ mất tiền và phải làm <strong>Change Request (CR)</strong>. Trong Agile, bạn hướng dẫn khách hàng cách ưu tiên tính năng quan trọng nhất để đưa vào <strong>Sprint</strong> tiếp theo.</span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-2xl shrink-0 mt-0.5">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-justify">
              <strong className="block text-lg text-slate-900 mb-2">Cách thức phối hợp với Dev Team</strong>
              <span className="text-slate-600 leading-relaxed">Waterfall thường có xu hướng "ném tài liệu qua rào" (bàn giao xong là xong). Ngược lại, Agile đòi hỏi BA phải giao tiếp hàng ngày với Dev/QA qua các buổi <strong>Daily Standup</strong>, <strong>Sprint Planning</strong> để giải đáp thắc mắc liên tục.</span>
            </div>
          </li>
        </ul>
      </div>
      
      <button
        onClick={onReset}
        className="text-slate-500 hover:text-slate-900 font-medium transition-colors flex items-center gap-2 px-6 py-3 rounded-full hover:bg-slate-100"
      >
        <RefreshCw className="w-5 h-5" />
        Xem lại từ đầu
      </button>
    </motion.div>
  );
}
