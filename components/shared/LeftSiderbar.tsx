'use client'
import Link from 'next/link'
import { sidebarLinks, musicSidebarLinks } from "@/constants";
import { usePathname, useRouter } from 'next/navigation'
import {SignedIn, SignOutButton, useAuth, useUser} from '@clerk/nextjs';
import { LogOut, Volume2, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';
import { subscriptionManager, UserSubscription } from '@/lib/subscription-permissions';

export default function LeftSidebar() {
  const pathname = usePathname()
  const router = useRouter();
  const { userId } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [userInfo, setUserInfo] = useState<any>({});
  
  useEffect(()=>{
    setUserInfo(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  },[userId])
  
  // 获取订阅信息
  useEffect(() => {
    if (userId) {
      const getSubscription = async () => {
        try {
          const subscriptionInfo = subscriptionManager.getSubscription();
          setSubscription(subscriptionInfo);
        } catch (error) {
          console.error('获取订阅信息失败:', error);
          // 出错时设置默认订阅
          setSubscription({
            plan: 'free',
            subscriptionId: 'default-subscription',
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            isActive: true
          });
        }
      };
      
      getSubscription();
    }
  }, [userId]);

  return (
      <section className={`custom-scrollbar h-full transition-all duration-300 ease-in-out flex flex-col 'w-14 md:w-64 bg-gray-900 border-r border-gray-800'}`}>
          <div className="p-4 flex flex-col h-full">
            <div className="flex flex-col items-center md:items-start gap-8 h-full">
              {/* 侧边栏标题（仅在中等屏幕及以上显示） */}
              <Link href="/" className="hidden md:block text-xl font-bold text-white hover:text-gray-200 transition-colors duration-200">
                <h2>音乐生成器</h2>
              </Link>
              
              {/* 侧边栏链接 */}
              <div className="space-y-2 w-full">
                {musicSidebarLinks.map((link) => {
                  const isActive = pathname === link.route;
                  const linkContent = (
                    <div className={`w-full flex items-center justify-center md:justify-start gap-3`}>
                      <link.icon className="w-6 h-6" />
                      <span className="hidden md:block font-medium">{link.label}</span>
                    </div>
                  );
                  
                  return (
                    <Link
                      key={link.id}
                      href={link.route}
                      className={`flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-green-900/50 to-green-600/30 border border-green-700/50 text-green-400' : 'text-gray-400 hover:bg-gray-800/70 hover:text-gray-200'}`}
                    >
                      {linkContent}
                    </Link>
                  );
                })}
              </div>
              
              <div className="mt-auto w-full">
                
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-800/30 hidden md:block">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-blue-400">订阅信息</h3>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">当前订阅: {subscription?.plan || '免费'}</p>
                  <Link href="/musicGenerator/pricing" className="text-xs text-blue-400 hover:underline mt-2 inline-block sm:mt-0"
                        onClick={(e) => {
                          e.preventDefault();
                          router.push('/musicGenerator/pricing');
                        }}
                      >
                      升级订阅
                    </Link>
                </div>
                
                {/* 登录状态 */}
                <div className="mt-6 p-3 border-t border-gray-800">
                  {userId ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Volume2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="hidden md:block text-center">
                        <p className="text-sm font-medium">当前用户: {userInfo?.userName || ''}</p>
                        <SignOutButton>
                          <button className="mt-2 px-3 py-1 text-xs text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-md transition-all duration-200">
                            登出
                          </button>
                        </SignOutButton>
                      </div>
                      <div className="md:hidden">
                        <SignOutButton>
                          <button className="p-1 text-gray-300 hover:text-white rounded-full hover:bg-gray-800/50 transition-all duration-200">
                            <LogOut className="w-4 h-4" />
                          </button>
                        </SignOutButton>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href="/sign-in"
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium transition-all duration-200 hover:opacity-90"
                    >
                      登录
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
      </section>
    )
}