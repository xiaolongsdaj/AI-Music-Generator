//背景动画粒子效果组件
import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  particleSizeRange?: [number, number];
  particleSpeedRange?: [number, number];
  connectionDistance?: number;
  connectionOpacity?: number;
  colorRange?: [number, number]; // HSL hue range, default is 240-300 (purple to blue)
  opacity?: number;
  mouseInteraction?: boolean;
  mouseRepelDistance?: number;
  glowIntensity?: number;
}

/**
 * 可复用的粒子背景组件
 * 提供自定义的粒子动效背景，支持鼠标交互
 */
export default function ParticleBackground({
  className = '',
  particleCount,
  particleSizeRange = [1, 2],
  particleSpeedRange = [0.3, 0.3],
  connectionDistance = 80,
  connectionOpacity = 0.2,
  colorRange = [240, 300], // 默认紫色到蓝色
  opacity = 1,
  mouseInteraction = true,
  mouseRepelDistance = 120,
  glowIntensity = 10,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 处理鼠标移动，用于粒子动效交互
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;
    };

    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // 粒子类
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      originalX: number;
      originalY: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.originalX = this.x;
        this.originalY = this.y;
        this.size = Math.random() * (particleSizeRange[1] - particleSizeRange[0]) + particleSizeRange[0];
        this.speedX = (Math.random() - 0.5) * particleSpeedRange[0];
        this.speedY = (Math.random() - 0.5) * particleSpeedRange[1];
        // 生成指定范围的颜色
        const hue = Math.random() * (colorRange[1] - colorRange[0]) + colorRange[0];
        this.color = `hsl(${hue}, 80%, 60%)`;
      }

      update() {
        // 基础移动
        this.x += this.speedX;
        this.y += this.speedY;

        // 鼠标交互 - 粒子远离鼠标
        if (mouseInteraction) {
          const dx = this.x - mousePosition.current.x;
          const dy = this.y - mousePosition.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = 1500 / (distance * distance); // 反平方力

          if (distance < mouseRepelDistance) {
            this.x += (dx / distance) * force;
            this.y += (dy / distance) * force;
          }
        }

        // 边界检查
        if (this.x < 0 || this.x > (canvas?.width || window.innerWidth)) this.speedX *= -1;
        if (this.y < 0 || this.y > (canvas?.height || window.innerHeight)) this.speedY *= -1;
        
        // 缓慢回到原始位置
        const backToOriginalSpeed = 0.001;
        this.x += (this.originalX - this.x) * backToOriginalSpeed;
        this.y += (this.originalY - this.y) * backToOriginalSpeed;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // 添加发光效果
        ctx.shadowColor = this.color;
        ctx.shadowBlur = glowIntensity;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // 创建粒子
    const particlesArray: Particle[] = [];
    const numberOfParticles = particleCount || Math.floor(window.innerWidth / 20);

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    // 连接粒子的函数
    const connectParticles = () => {
      if (!ctx) return;
      const opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = opacityValue - distance / connectionDistance;
            // 根据距离变化线条颜色
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x,
              particlesArray[a].y,
              particlesArray[b].x,
              particlesArray[b].y
            );
            gradient.addColorStop(0, particlesArray[a].color);
            gradient.addColorStop(1, particlesArray[b].color);
            
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = opacity * connectionOpacity;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    // 动画循环
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();

    // 清理
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [particleCount, particleSizeRange, particleSpeedRange, connectionDistance, connectionOpacity, colorRange, mouseInteraction, mouseRepelDistance, glowIntensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full opacity-${Math.round(opacity * 100)} ${className}`} 
    />
  );
}