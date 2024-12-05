import React from 'react';
import { motion } from 'framer-motion';
import tinycolor from 'tinycolor2';

const generateGradient = (color: string) => {
  const baseColor = tinycolor(color);
  const gradientColors = [
    baseColor.lighten(10).toString(),
    baseColor.spin(60).toString(),
    baseColor.spin(120).toString(),
    baseColor.darken(10).toString(),
  ];

  return `radial-gradient(circle farthest-side at 0 100%, ${gradientColors[0]}, transparent),
          radial-gradient(circle farthest-side at 100% 0, ${gradientColors[1]}, transparent),
          radial-gradient(circle farthest-side at 100% 100%, ${gradientColors[2]}, transparent),
          radial-gradient(circle farthest-side at 0 0, ${gradientColors[3]}, #141316)`;
};

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  backgroundColor,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  backgroundColor: string;
  animate?: boolean;
}) => {
  console.log('Background Color:', backgroundColor);
  const gradient = generateGradient(backgroundColor);
  console.log('Generated Gradient:', gradient);

  return (
    <div className={`relative p-[4px] group ${containerClassName}`}>
      <motion.div
        variants={
          animate
            ? {
                initial: { backgroundPosition: '0 50%' },
                animate: {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                },
              }
            : undefined
        }
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }
            : undefined
        }
        style={{
          backgroundSize: '400% 400%',
          backgroundImage: gradient,
        }}
        className="absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform"
      />
      <motion.div
        variants={
          animate
            ? {
                initial: { backgroundPosition: '0 50%' },
                animate: {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                },
              }
            : undefined
        }
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }
            : undefined
        }
        style={{
          backgroundSize: '400% 400%',
          backgroundImage: gradient,
        }}
        className="absolute inset-0 rounded-3xl z-[1] will-change-transform"
      />
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
};
