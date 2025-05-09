import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import QuestionCard from "@/components/QuestionCard";

const QuestionsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#F1F0FB]/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="HelpCircle" className="text-primary h-8 w-8" />
            <h1 className="text-2xl font-bold text-gray-900">QuestionHub</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Войти
            </Link>
            <Link
              to="/register"
              className="text-white bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Вопросы и ответы
            </h1>
            <p className="text-gray-600 mt-1">
              Найдите ответы на интересующие вас вопросы или задайте свой
            </p>
          </div>
          <Link
            to="/ask"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 flex items-center"
          >
            <Icon name="PlusCircle" className="mr-2 h-4 w-4" />
            Задать вопрос
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
              />
              <Input
                placeholder="Поиск вопросов..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                <Icon name="Filter" className="h-4 w-4" />
                <span>Фильтры</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                <Icon name="ArrowDownUp" className="h-4 w-4" />
                <span>Сортировка</span>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-white">
            <TabsTrigger value="all">Все вопросы</TabsTrigger>
            <TabsTrigger value="popular">Популярные</TabsTrigger>
            <TabsTrigger value="unanswered">Без ответов</TabsTrigger>
            <TabsTrigger value="recent">Недавние</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6 space-y-4">
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </TabsContent>

          <TabsContent value="popular" className="mt-6 space-y-4">
            {questions
              .filter((q) => q.views > 200)
              .map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
          </TabsContent>

          <TabsContent value="unanswered" className="mt-6 space-y-4">
            {questions
              .filter((q) => q.answers === 0)
              .map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
          </TabsContent>

          <TabsContent value="recent" className="mt-6 space-y-4">
            {[...questions]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              )
              .map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Похожие вопросы
            </h2>
            <div className="space-y-4">
              {relatedQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} compact />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Топ экспертов</CardTitle>
                <CardDescription>
                  Пользователи с наибольшим количеством ответов
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topExperts.map((expert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={expert.avatar} alt={expert.name} />
                      <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{expert.name}</div>
                      <div className="text-sm text-gray-500">
                        {expert.answers} ответов
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-primary/5 text-primary border-primary/20"
                    >
                      {expert.rating}
                    </Badge>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link
                  to="/experts"
                  className="w-full text-center text-sm text-gray-600 hover:text-gray-900 py-2"
                >
                  Посмотреть всех
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Популярные теги</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="hover:bg-primary/10 cursor-pointer transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icon name="HelpCircle" className="text-primary h-6 w-6" />
              <span className="font-bold text-gray-900">QuestionHub</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 QuestionHub. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const questions = [
  {
    id: 1,
    title: "Как увеличить конверсию лендинга для B2B SaaS продукта?",
    content:
      "Я руководитель маркетинга в B2B SaaS компании. В последнее время заметил снижение конверсии на нашем лендинге. Какие лучшие практики и стратегии вы рекомендуете для увеличения конверсии именно для B2B сегмента?",
    tags: ["marketing", "conversion", "b2b", "saas"],
    date: "2025-05-07T14:30:00",
    userName: "Алексей В.",
    userAvatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=250",
    answers: 8,
    views: 423,
    votes: 16,
  },
  {
    id: 2,
    title: "Как эффективно настроить CI/CD для микросервисной архитектуры?",
    content:
      "Наша команда переходит с монолита на микросервисы. Какие инструменты и практики вы рекомендуете для настройки эффективного процесса CI/CD в микросервисной архитектуре? Особенно интересуют решения для оркестрации и мониторинга.",
    tags: ["devops", "microservices", "ci-cd", "kubernetes"],
    date: "2025-05-08T10:15:00",
    userName: "Максим К.",
    userAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250",
    answers: 5,
    views: 287,
    votes: 12,
  },
  {
    id: 3,
    title: "Какие методы привлечения первых пользователей для нового продукта?",
    content:
      "Мы запускаем новый продукт в сфере управления проектами. Какие самые эффективные каналы и методы привлечения первых пользователей с минимальным бюджетом? Какие тактики помогли вам в похожей ситуации?",
    tags: ["startup", "marketing", "growth", "user-acquisition"],
    date: "2025-05-06T09:45:00",
    userName: "Ольга П.",
    userAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=250",
    answers: 10,
    views: 532,
    votes: 24,
  },
  {
    id: 4,
    title: "Как оптимизировать SQL-запросы для больших объемов данных?",
    content:
      "У нас в базе уже около 10 миллионов записей и некоторые запросы стали работать очень медленно. Какие приемы оптимизации SQL-запросов вы используете для работы с большими объемами данных? Интересуют как общие подходы, так и конкретные технические решения.",
    tags: ["sql", "databases", "performance", "optimization"],
    date: "2025-05-04T16:22:00",
    userName: "Сергей М.",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250",
    answers: 7,
    views: 378,
    votes: 18,
  },
  {
    id: 5,
    title: "Лучшие практики управления удаленной командой разработчиков?",
    content:
      "Я технический руководитель команды, которая полностью перешла на удаленную работу. Какие инструменты и методики вы рекомендуете для эффективного управления удаленной командой разработчиков? Как поддерживать высокую продукность и командный дух?",
    tags: ["management", "remote-work", "team-building", "productivity"],
    date: "2025-05-03T11:40:00",
    userName: "Екатерина З.",
    userAvatar:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=250",
    answers: 0,
    views: 156,
    votes: 5,
  },
];

const relatedQuestions = [
  {
    id: 11,
    title:
      "Какие KPI лучше всего отслеживать для SaaS платформы вопросов-ответов?",
    content: "...",
    tags: ["saas", "metrics", "kpi", "analytics"],
    date: "2025-05-01T14:30:00",
    userName: "Виктор Л.",
    userAvatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=250",
    answers: 3,
    views: 198,
    votes: 7,
  },
  {
    id: 12,
    title: "Как монетизировать платформу вопросов-ответов?",
    content: "...",
    tags: ["monetization", "saas", "business-model"],
    date: "2025-04-28T09:15:00",
    userName: "Андрей К.",
    userAvatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=250",
    answers: 6,
    views: 312,
    votes: 14,
  },
  {
    id: 13,
    title: "Лучшие практики модерации контента в Q&A сервисах?",
    content: "...",
    tags: ["moderation", "content", "community"],
    date: "2025-04-25T16:45:00",
    userName: "Наталья М.",
    userAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250",
    answers: 4,
    views: 231,
    votes: 9,
  },
];

const topExperts = [
  {
    name: "Михаил К.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=250",
    answers: 453,
    rating: 4.9,
  },
  {
    name: "Анна Т.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250",
    answers: 387,
    rating: 4.8,
  },
  {
    name: "Дмитрий С.",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=250",
    answers: 321,
    rating: 4.7,
  },
  {
    name: "Елена О.",
    avatar:
      "https://images.unsplash.com/photo-1614644147724-2d4785d69962?q=80&w=250",
    answers: 294,
    rating: 4.6,
  },
];

const popularTags = [
  "react",
  "marketing",
  "saas",
  "javascript",
  "seo",
  "design",
  "product",
  "startup",
  "python",
  "analytics",
  "business",
  "ux",
  "development",
  "api",
  "nodejs",
];

export default QuestionsPage;
