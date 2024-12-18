import React from 'react';
interface ServiceState {
    wifi: boolean;
    condicioner: boolean;
    bedlinen: boolean;
    cofe: boolean;
  }
  
  interface ClassNameProviderProps {
    feature: keyof ServiceState; // Ограничиваем тип ключами объекта ServiceState
    included: boolean; // Включен ли сервис
    serviceState: ServiceState; // Объект состояния услуг
    children: React.ReactNode; // Контент, который будет обернут в div с классом
  }

interface ClassNameProviderProps {
  feature: keyof ServiceState; // Название услуги, например, 'wifi', 'condicioner'
  included: boolean; // Включена ли услуга
  serviceState: ServiceState; // Состояние доступных услуг
  children: React.ReactNode; // Контент, который будет обернут в div с классом
  onClick?: () => void; // Опциональный обработчик для onClick
  onMouseEnter?: () => void; // Опциональный обработчик для onMouseEnter
  onMouseLeave?: () => void;
}

const ClassNameProvider: React.FC<ClassNameProviderProps> = ({ 
    feature, included, serviceState, children,
    onClick, 
    onMouseEnter, 
    onMouseLeave }) => {
      
  const getClassName = () => {
 
    if (serviceState[feature]) return 'svg-container-active';
    if (included) return 'svg-container-included';
  
    return 'svg-container';
  };

  return (
    <button className={getClassName()} disabled={included}
      onClick={onClick} // Добавляем поддержку onClick
      onMouseEnter={onMouseEnter} // Добавляем поддержку onMouseEnter
      onMouseLeave={onMouseLeave} // Добавляем поддержку onMouseLeave
    >
      {children}
    </button>
  );
};

export default ClassNameProvider;