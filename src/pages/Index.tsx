import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
}

interface AnnouncementItem {
  id: number;
  title: string;
  author: string;
  date: string;
  text: string;
  status: 'pending' | 'approved';
}

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('news');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    author: '',
    text: ''
  });

  const newsData: NewsItem[] = [
    {
      id: 1,
      title: 'Благоустройство детской площадки завершено',
      date: '23 октября 2025',
      category: 'Благоустройство',
      excerpt: 'На территории ЖК Ботанический установлено новое современное игровое оборудование для детей всех возрастов.'
    },
    {
      id: 2,
      title: 'График отключения горячей воды',
      date: '22 октября 2025',
      category: 'ЖКХ',
      excerpt: 'С 25 по 28 октября будут проводиться плановые работы по обслуживанию системы водоснабжения.'
    },
    {
      id: 3,
      title: 'Открытие нового магазина продуктов',
      date: '20 октября 2025',
      category: 'Инфраструктура',
      excerpt: 'В первом корпусе открылся новый продуктовый магазин с широким ассортиментом товаров.'
    }
  ];

  const eventsData: EventItem[] = [
    {
      id: 1,
      title: 'День соседей',
      date: '28 октября 2025',
      time: '14:00',
      location: 'Центральная площадка',
      description: 'Приглашаем всех жителей на дружескую встречу с угощениями и развлечениями для детей.'
    },
    {
      id: 2,
      title: 'Субботник',
      date: '30 октября 2025',
      time: '10:00',
      location: 'Территория комплекса',
      description: 'Общий субботник по уборке придомовой территории. Инвентарь предоставляется.'
    }
  ];

  const announcementsData: AnnouncementItem[] = [
    {
      id: 1,
      title: 'Продам детскую коляску',
      author: 'Мария К.',
      date: '23 октября 2025',
      text: 'Продаю детскую коляску в отличном состоянии, цвет серый. Цена 8000 руб.',
      status: 'approved'
    },
    {
      id: 2,
      title: 'Ищу няню для ребенка',
      author: 'Елена С.',
      date: '22 октября 2025',
      text: 'Требуется няня для ребенка 3 лет, график 5/2, с 8 до 18. Опыт обязателен.',
      status: 'approved'
    }
  ];

  const infrastructureData = [
    { name: 'Детский сад "Радуга"', address: 'Корпус 1', phone: '+7 (846) 123-45-67' },
    { name: 'Фитнес-центр "Здоровье"', address: 'Корпус 3', phone: '+7 (846) 234-56-78' },
    { name: 'Продуктовый магазин "Пятёрочка"', address: 'Корпус 2', phone: '+7 (846) 345-67-89' },
    { name: 'Аптека "Здравсити"', address: 'Корпус 1', phone: '+7 (846) 456-78-90' }
  ];

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Объявление отправлено на модерацию',
      description: 'Ваше объявление будет опубликовано после проверки модератором.'
    });
    setAnnouncementForm({ title: '', author: '', text: '' });
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Building2" className="text-primary" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-foreground">ЖК Ботанический</h1>
                <p className="text-sm text-muted-foreground">Новостной портал района</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" onClick={() => setActiveTab('news')}>Главная</Button>
              <Button variant="ghost" onClick={() => setActiveTab('events')}>Афиша</Button>
              <Button variant="ghost" onClick={() => setActiveTab('announcements')}>Объявления</Button>
              <Button variant="ghost" onClick={() => setActiveTab('infrastructure')}>Инфраструктура</Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="events">Афиша</TabsTrigger>
            <TabsTrigger value="announcements">Объявления</TabsTrigger>
            <TabsTrigger value="infrastructure">Инфраструктура</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Новости района</h2>
              <div className="grid gap-6">
                {newsData.map((news) => (
                  <Card key={news.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{news.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Icon name="Calendar" size={16} className="mr-1" />
                          {news.date}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{news.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{news.excerpt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Афиша событий</h2>
              <div className="grid gap-6">
                {eventsData.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2 text-primary">
                        <Icon name="CalendarDays" size={20} />
                        <span className="font-semibold">{event.date} • {event.time}</span>
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Icon name="MapPin" size={16} className="mr-1" />
                        {event.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Объявления жителей</h2>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Icon name="Plus" size={20} />
                      <span>Подать объявление</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Новое объявление</DialogTitle>
                      <DialogDescription>
                        Ваше объявление будет отправлено на модерацию и опубликовано после проверки.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Заголовок</Label>
                        <Input
                          id="title"
                          value={announcementForm.title}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="author">Ваше имя</Label>
                        <Input
                          id="author"
                          value={announcementForm.author}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, author: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="text">Текст объявления</Label>
                        <Textarea
                          id="text"
                          value={announcementForm.text}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, text: e.target.value })}
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">Отправить на модерацию</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid gap-6">
                {announcementsData.map((announcement) => (
                  <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          {announcement.author} • {announcement.date}
                        </span>
                        {announcement.status === 'approved' && (
                          <Badge variant="default" className="flex items-center space-x-1">
                            <Icon name="CheckCircle" size={14} />
                            <span>Одобрено</span>
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{announcement.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="infrastructure" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Инфраструктура района</h2>
              <div className="grid gap-4">
                {infrastructureData.map((place, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Icon name="MapPin" size={20} className="text-primary" />
                        <span>{place.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Icon name="Home" size={16} />
                          <span>{place.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Phone" size={16} />
                          <span>{place.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-lg mb-2">ЖК Ботанический</h3>
              <p className="text-sm text-muted-foreground">г. Самара, ул. Ботаническая</p>
            </div>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Phone" size={18} />
                <span>+7 (846) 000-00-00</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Mail" size={18} />
                <span>info@botanicheskiy.ru</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
