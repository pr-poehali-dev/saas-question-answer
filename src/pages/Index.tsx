
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F0FB] to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon name="HelpCircle" className="text-primary h-8 w-8" />
          <h1 className="text-2xl font-bold text-gray-900">QuestionHub</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Войти</Button>
          <Button>Регистрация</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-5xl font-bold leading-tight text-gray-900">
            Задавайте вопросы, получайте <span className="text-primary">экспертные ответы</span>
          </h2>
          <p className="text-xl text-gray-600">
            Наша платформа соединяет людей с вопросами и экспертов с ответами. Получите решение ваших проблем быстро и эффективно.
          </p>
          <div className="flex gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                Начать бесплатно
              </span>
              <Icon name="ArrowRight" className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </Button>
            <Button size="lg" variant="outline">Узнать больше</Button>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative z-10 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Популярные вопросы</h3>
              <Button variant="ghost" size="sm">
                Смотреть все <Icon name="ChevronRight" className="ml-1 h-4 w-4" />
              </Button>
            </div>
            {popularQuestions.map((question, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 py-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={question.userAvatar} alt={question.userName} />
                    <AvatarFallback>{question.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900 hover:text-primary transition-colors">
                      {question.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Icon name="User" className="h-3 w-3" /> {question.userName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="MessageCircle" className="h-3 w-3" /> {question.answers} ответов
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" className="h-3 w-3" /> {question.views} просмотров
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-8 -right-4 -bottom-8 -left-4 bg-primary/5 rounded-xl -z-10"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Почему QuestionHub?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Наша платформа предлагает уникальные возможности для поиска ответов и обмена знаниями
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-3">
                  <Icon name={feature.icon} className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Готовы найти ответы на ваши вопросы?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Присоединяйтесь к тысячам пользователей, которые уже нашли решения своих проблем на QuestionHub
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
            Задать вопрос сейчас
            <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="HelpCircle" className="text-white h-6 w-6" />
                <h3 className="text-xl font-bold">QuestionHub</h3>
              </div>
              <p className="text-gray-400">
                Платформа для вопросов и ответов, которая соединяет людей с экспертами
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Компания</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Карьера</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Блог</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Функции</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Цены</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Отзывы</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Юридическая информация</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Условия использования</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
            <p>© 2025 QuestionHub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Mock data
const popularQuestions = [
  {
    title: "Как создать эффективную стратегию контент-маркетинга для стартапа?",
    userName: "Анна М.",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250",
    answers: 12,
    views: 342
  },
  {
    title: "Какие библиотеки React лучше всего подходят для создания дашбордов?",
    userName: "Павел К.",
    userAvatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=250",
    answers: 8,
    views: 216
  },
  {
    title: "Как оптимизировать SEO для одностраничного приложения?",
    userName: "Мария С.",
    userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250",
    answers: 5,
    views: 189
  }
];

const features = [
  {
    icon: "Users",
    title: "Экспертное сообщество",
    description: "Тысячи квалифицированных специалистов готовы поделиться своими знаниями"
  },
  {
    icon: "Zap",
    title: "Быстрые ответы",
    description: "Получайте ответы на ваши вопросы в течение нескольких минут"
  },
  {
    icon: "Shield",
    title: "Проверенные решения",
    description: "Система оценки качества ответов помогает находить лучшие решения"
  }
];

export default HomePage;
