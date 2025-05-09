
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const AskQuestion = () => {
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submittedQuestion, setSubmittedQuestion] = useState<Question | null>(null);

  interface Answer {
    id: number;
    content: string;
    userName: string;
    userAvatar: string;
    date: string;
    votes: number;
  }

  interface Question {
    title: string;
    content: string;
    tags: string[];
    date: string;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !question.trim()) return;
    
    const newQuestion: Question = {
      title: title,
      content: question,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      date: new Date().toISOString(),
    };
    
    setSubmittedQuestion(newQuestion);
    
    // Имитация получения ответов от API (в реальном приложении здесь был бы запрос)
    const mockResponses = [
      {
        id: 1,
        content: "Это очень интересный вопрос! Я думаю, что лучший подход - это начать с анализа целевой аудитории. Когда вы понимаете потребности пользователей, вы можете создать контент, который привлекает именно их внимание.",
        userName: "Анна М.",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250",
        date: new Date().toISOString(),
        votes: 5
      },
      {
        id: 2,
        content: "Мой совет - начните с SEO-оптимизации и качественного контента. Это два столпа успешной стратегии привлечения пользователей. Также обратите внимание на стратегии роста через социальные сети и партнерские программы.",
        userName: "Михаил К.",
        userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=250",
        date: new Date(Date.now() - 25 * 60000).toISOString(),
        votes: 3
      }
    ];
    
    setTimeout(() => {
      setAnswers(mockResponses);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) {
      return "только что";
    } else if (diffMins < 60) {
      return `${diffMins} мин назад`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) {
        return `${diffHours} ч назад`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} дн назад`;
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F0FB]/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="HelpCircle" className="text-primary h-8 w-8" />
            <Link to="/" className="text-2xl font-bold text-gray-900">
              QuestionHub
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/questions"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Все вопросы
            </Link>
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              На главную
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Задайте вопрос
          </h1>

          {!submittedQuestion ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Новый вопрос</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Заголовок вопроса
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full"
                      placeholder="Например: Как увеличить трафик на веб-сайте?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="question" className="text-sm font-medium">
                      Детали вопроса
                    </label>
                    <Textarea
                      id="question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="min-h-[150px] w-full"
                      placeholder="Опишите свой вопрос подробнее..."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium">
                      Теги (через запятую)
                    </label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full"
                      placeholder="Например: маркетинг, seo, продвижение"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <div
                      onClick={handleSubmit}
                      className="inline-flex text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-md cursor-pointer"
                    >
                      Отправить вопрос
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Показываем заданный вопрос */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-white pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {submittedQuestion.title}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>Задан {formatDate(submittedQuestion.date)}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-700 whitespace-pre-line">
                    {submittedQuestion.content}
                  </p>
                  
                  {submittedQuestion.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {submittedQuestion.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="px-2 py-1 bg-primary/5 text-primary/80 border border-primary/10 rounded-md text-xs font-medium"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Ответы */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {answers.length > 0
                    ? `Ответы (${answers.length})`
                    : "Ответы появятся здесь"}
                </h3>
                
                {answers.length === 0 ? (
                  <div className="py-8 flex flex-col items-center justify-center text-gray-500">
                    <Icon name="Loader" className="h-8 w-8 mb-4 animate-spin" />
                    <p>Ищем ответы на ваш вопрос...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {answers.map((answer) => (
                      <Card key={answer.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center space-y-2">
                              <div
                                className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:text-primary"
                              >
                                <Icon name="ChevronUp" className="h-5 w-5" />
                              </div>
                              <span className="font-medium text-gray-700">
                                {answer.votes}
                              </span>
                              <div
                                className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:text-destructive"
                              >
                                <Icon name="ChevronDown" className="h-5 w-5" />
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <p className="text-gray-700 whitespace-pre-line">
                                {answer.content}
                              </p>
                              
                              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={answer.userAvatar}
                                      alt={answer.userName}
                                    />
                                    <AvatarFallback>
                                      {answer.userName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <span className="font-medium text-gray-900">
                                      {answer.userName}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-2">
                                      ответил {formatDate(answer.date)}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span className="cursor-pointer hover:text-gray-700">
                                    Поделиться
                                  </span>
                                  <Separator orientation="vertical" className="h-4" />
                                  <span className="cursor-pointer hover:text-gray-700">
                                    Комментировать
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                {/* Форма ответа */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Ваш ответ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Textarea
                        className="min-h-[150px] w-full"
                        placeholder="Напишите свой ответ здесь..."
                      />
                      <div className="flex justify-end">
                        <div
                          className="inline-flex text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-md cursor-pointer"
                        >
                          Опубликовать ответ
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
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

export default AskQuestion;
