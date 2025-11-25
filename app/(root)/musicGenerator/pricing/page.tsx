'use client'
import { useState, useEffect, useRef } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import PricingPlanCard from '@/components/pricing/PricingPlanCard';
import PaymentForm from '@/components/pricing/PaymentForm';
import ConfirmationPage from '@/components/pricing/ConfirmationPage';
import SuccessPage from '@/components/pricing/SuccessPage';
import { PricingPlan } from '@/components/pricing/PricingPlanCard';
import ParticleBackground from '@/components/shared/ParticleBackground';// 引入粒子背景组件
import { subscriptionManager } from '@/lib/subscription-permissions'; // 引入订阅权限管理
interface ApiResponse {
  success: boolean;
  plans?: PricingPlan[];
  plan?: PricingPlan;
  error?: string;
  message: string;
  timestamp?: string;
}

// 订阅流程状态
type SubscriptionStep = 'planSelection' | 'paymentDetails' | 'confirmation' | 'success';
// 主页面组件
function PricingPage() {
  // 状态管理
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [currentStep, setCurrentStep] = useState<SubscriptionStep>('planSelection');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // 订阅信息状态保持不变
  // 与ConfirmationPage组件的SubscriptionInfo接口匹配
  const [subscriptionInfo, setSubscriptionInfo] = useState<{
    subscriptionId: string;
    nextBillingDate: string;
    planName: string;
  } | null>(null);
  
  // 获取订阅计划的函数 - 定义在组件顶部以便在整个组件中访问
  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/pricing', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data: ApiResponse = await response.json();
      
      if (response.ok && data.success && data.plans) {
        setPlans(data.plans);
        setLoading(false);
      } else {
        setError(data.error || '获取订阅计划失败，请稍后再试');
        setLoading(false);
      }
    } catch (err) {
      setError('获取订阅计划失败，请稍后再试');
      setLoading(false);
      console.error('Error fetching plans:', err);
    }
  };
  
  useEffect(() => {
    fetchPlans();
  }, []);
  
  // 处理计划选择 - 调用API获取计划详情
  const handleSelectPlan = async (planId: string) => {
    try {
      setSelectedPlanId(planId);
      setLoading(true);
      
      const response = await fetch('/api/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });
      
      // 解析API响应
      const data: ApiResponse = await response.json();
      
      // 检查响应是否成功
      if (response.ok && data.success && data.plan) {
        setSelectedPlan(data.plan);
        setCurrentStep('paymentDetails');
      } else {
        setError(data.error || '获取计划详情失败');
      }
    } catch (err) {
      console.error('Error fetching plan details:', err);
      setError('获取计划详情失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };
  
  // 返回计划选择页面
  const handleBackToPlans = () => {
    setCurrentStep('planSelection');
  };
  
  // 返回支付详情页面
  const handleBackToPayment = () => {
    setCurrentStep('paymentDetails');
  };
  
  const handlePaymentSubmit = async () => {
    try {
      if (!selectedPlanId) return;
      const response = await fetch('/api/pricing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          planId: selectedPlanId, 
          paymentInfo: { email: 'user@example.com' } 
        }),
      });
      
      // 解析API响应
      const data = await response.json();
      
      // 检查响应是否成功
      if (response.ok && data.success) {
        // 设置订阅信息
        const subscriptionInfo = {
          subscriptionId: data.subscriptionId,
          planName: data.planName,
          nextBillingDate: data.nextBillingDate,
        };
        setSubscriptionInfo(subscriptionInfo);
        setCurrentStep('confirmation');
      } else {
        setError(data.error || '支付处理失败');
      }
    } catch (err) {
      console.error('Payment submission error:', err);
      setError('支付处理失败，请稍后再试');
    }
  };
  
  // 处理确认订阅
  const handleConfirmSubscription = async () => {
    setSubmitting(true);
    try {
      // 在实际应用中，这里可能需要额外的确认API调用
      // 更新本地存储的订阅状态
      if (selectedPlan) {
        subscriptionManager.updateSubscriptionPlan(selectedPlan.id as 'free' | 'standard' | 'enterprise');
        console.log('用户订阅已更新为:', selectedPlan.id);
      }
      // 进入成功页面
      setCurrentStep('success');
    } catch (err) {
      console.error('Subscription confirmation error:', err);
      setError('确认订阅失败，请稍后再试');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 opacity-90"></div>
      {/* 使用粒子背景组件 */}
      <ParticleBackground 
        className="z-0" 
        particleSizeRange={[1, 5]} // 粒子大小范围
        connectionDistance={80}// 粒子连接距离
        connectionOpacity={0.2}// 粒子连接透明度
        mouseRepelDistance={120}// 鼠标排斥距离
      />
      
      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* 页面标题 - 统一风格 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">简单透明的定价</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            选择最适合您和团队需求的计划，无需长期承诺，随时可取消
          </p>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <Loader2 className="w-12 h-12 mx-auto text-blue-400 animate-spin mb-4" />
              <p className="text-white">加载订阅计划中...</p>
            </div>
          </div>
        )}
        
        {error && !loading && (
          <div className="max-w-md mx-auto mt-16 bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white/20">
            <div className="flex items-center gap-3 text-pink-300 mb-4">
              <AlertCircle size={24} />
              <h3 className="text-xl font-bold text-white">出现错误</h3>
            </div>
            <p className="text-white/80 mb-6">{error}</p>
            <Button 
              className="w-full bg-white text-purple-800 hover:bg-white/90" 
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchPlans();
              }}
            >
              重试
            </Button>
          </div>
        )}
        
        {!loading && !error && (
          <>
            {currentStep === 'planSelection' && (
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                  {plans.map((plan) => (
                    <PricingPlanCard
                      key={plan.id}
                      plan={{
                        ...plan,
                        // 为突出的计划添加紫色主题
                        cardClassName: plan.isHighlighted ? 'bg-gradient-to-br from-purple-600 to-blue-600' : ''
                      }}
                      onSelectPlan={handleSelectPlan}
                      selectedPlanId={selectedPlanId}
                    />
                  ))}
                </div>
                
              </div>
            )}
            
            {currentStep === 'paymentDetails' && selectedPlan && (
              <PaymentForm 
                selectedPlan={selectedPlan} 
                onSubmit={handlePaymentSubmit} 
                onBack={handleBackToPlans}
              />
            )}
            
            {currentStep === 'confirmation' && selectedPlan && (
              <ConfirmationPage 
                selectedPlan={selectedPlan} 
                onConfirm={handleConfirmSubscription} 
                onBack={handleBackToPayment}
                isProcessing={submitting}
                subscriptionInfo={subscriptionInfo}
              />
            )}
            
            {currentStep === 'success' && selectedPlan && (
              <SuccessPage 
                selectedPlan={selectedPlan} 
                subscriptionInfo={subscriptionInfo || undefined}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default PricingPage;