
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface QuestionProps {
  question: {
    id: number;
    title: string;
    content: string;
    tags: string[];
    date: string;
    userName: string;
    userAvatar: string;
    answers: number;
    views: number;
    votes: number;
  };
  compact?: boolean;
}

const QuestionCard = ({ question, compact = false }: QuestionProps) => {
  const [votes, setVotes] = useState(question.votes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} мин назад`;
    } else if (diffHours < 24) {
      return `${diffHours} ч назад`;
    } else if (diffDays < 7) {
      return `${diffDays} дн назад`;
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  };

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      setVotes(type === 'up' ? votes - 1 : votes + 1);
      setUserVote(null);
    } else {
      if (userVote === 'up' && type === 'down') {
        setVotes(votes - 2);
      } else if (userVote === 'down' && type === 'up') {
        setVotes(votes + 2);
      } else {
        setVotes(type === 'up' ? votes + 1 : votes - 1);
      }
      setUserVote(type);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border border-gray-100 group">
      <div className="flex">
        {/* Vote Column */}
        {!compact && (
          <div className="flex flex-col items-center p-4 bg-gray-50 border-r border-gray-100">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 w-8 p-0 rounded-full ${userVote === 'up' ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-primary'}`}
              onClick={() => handleVote('up')}
            >
              <Icon name="ChevronUp" className="h-5 w-5" />
            </Button>
            <span className="font-medium text-gray-700 my-1">{votes}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 w-8 p-0 rounded-full ${userVote === 'down' ? 'text-destructive bg-destructive/10' : 'text-gray-400 hover:text-destructive'}`}
              onClick={() => handleVote('down')}
            >
              <Icon name="ChevronDown" className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1">
          <CardHeader className={compact ? "py-3 px-4" : "p-4"}>
            <div className="flex justify-between items-start gap-4">
              <a href={`/questions/${question.id}`} className="font-semibold text-gray-900 text-lg group-hover:text-primary transition-colors">
                {question.title}
              </a>
              {compact && (
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => handleVote('up')}
                  >
                    <Icon name="ArrowUp" className="h-4 w-4 text-gray-400" />
                  </Button>
                  <span className="text-sm font-medium text-gray-700">{votes}</span>
                </div>
              )}
            </div>
          </CardHeader>
          
          {!compact && (
            <CardContent className="px-4 pb-2">
              <p className="text-gray-600 line-clamp-2">{question.content}</p>
            </CardContent>
          )}
          
          <CardFooter className={`${compact ? "pt-1 pb-3 px-4" : "px-4 py-3"} flex flex-wrap justify-between`}>
            <div className="flex flex-wrap gap-1.5">
              {question.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="bg-primary/5 text-primary/80 border-primary/10 hover:bg-primary/10 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2 sm:mt-0">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={question.userAvatar} alt={question.userName} />
                  <AvatarFallback>{question.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{question.userName}</span>
                <span className="text-gray-400">•</span>
                <span>{formatDate(question.date)}</span>
              </div>
              
              <div className="hidden sm:flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Icon name="MessageCircle" className="h-4 w-4" />
                  {question.answers}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Eye" className="h-4 w-4" />
                  {question.views}
                </span>
              </div>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
