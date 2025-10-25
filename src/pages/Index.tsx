import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AnnouncementItem {
  id: number;
  title: string;
  author_name: string;
  date: string;
  text: string;
  status: string;
  category?: string;
}

const ANNOUNCEMENT_API = 'https://functions.poehali.dev/7ebeb6db-a4ea-4e86-bc6c-165b9e5c766e';

const Index = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    author: '',
    text: '',
    category: 'other'
  });

  const categories = [
    { id: 'all', name: 'Все объявления', icon: 'Grid3x3' },
    { id: 'sale', name: 'Продажа', icon: 'ShoppingBag' },
    { id: 'services', name: 'Услуги', icon: 'Wrench' },
    { id: 'realestate', name: 'Недвижимость', icon: 'Home' },
    { id: 'community', name: 'Сообщество', icon: 'Users' },
    { id: 'other', name: 'Разное', icon: 'Package' }
  ];

  const heroSlides = [
    {
      title: 'Добро пожаловать в ЖК Ботанический',
      description: 'Ваш уютный район в центре Самары',
      color: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Новости и события района',
      description: 'Будьте в курсе всего, что происходит рядом',
      color: 'from-green-500 to-green-700'
    },
    {
      title: 'Доска объявлений',
      description: 'Покупайте, продавайте, находите услуги среди соседей',
      color: 'from-purple-500 to-purple-700'
    }
  ];

  useEffect(() => {
    fetchAnnouncements();
  }, [selectedCategory, searchQuery]);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      const url = params.toString() ? `${ANNOUNCEMENT_API}?${params.toString()}` : ANNOUNCEMENT_API;
      const response = await fetch(url);
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(ANNOUNCEMENT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcementForm)
      });
      
      if (response.ok) {
        toast({
          title: 'Объявление отправлено на модерацию',
          description: 'Ваше объявление будет опубликовано после проверки модератором.'
        });
        setAnnouncementForm({ title: '', author: '', text: '', category: 'other' });
        setDialogOpen(false);
        fetchAnnouncements();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить объявление. Попробуйте позже.',
        variant: 'destructive'
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary rounded-lg p-2">
                <Icon name="Building2" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ЖК Ботанический</h1>
                <p className="text-xs text-muted-foreground">г. Самара</p>
              </div>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Icon name="Plus" size={18} />
                  <span className="hidden sm:inline">Подать объявление</span>
                  <span className="sm:hidden">Добавить</span>
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
                      placeholder="Например: Продам детскую коляску"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Ваше имя</Label>
                    <Input
                      id="author"
                      value={announcementForm.author}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, author: e.target.value })}
                      placeholder="Как к вам обращаться"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="text">Описание</Label>
                    <Textarea
                      id="text"
                      value={announcementForm.text}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, text: e.target.value })}
                      rows={4}
                      placeholder="Подробное описание вашего объявления"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Отправить на модерацию</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className={`bg-gradient-to-r ${slide.color} rounded-xl p-12 text-white`}>
                    <h2 className="text-4xl font-bold mb-3">{slide.title}</h2>
                    <p className="text-xl opacity-90">{slide.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Категории</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.id ? 'border-primary border-2' : ''
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <Icon 
                    name={category.icon as any} 
                    className={`mx-auto mb-2 ${
                      selectedCategory === category.id ? 'text-primary' : 'text-muted-foreground'
                    }`} 
                    size={32} 
                  />
                  <p className={`text-sm font-medium ${
                    selectedCategory === category.id ? 'text-primary' : 'text-foreground'
                  }`}>
                    {category.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-2xl font-bold">Объявления</h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск по объявлениям..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                {announcements.length} объявлений
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка объявлений...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">Объявлений пока нет</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {announcement.status === 'approved' ? 'Опубликовано' : 'На модерации'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{announcement.date}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{announcement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                      {announcement.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Icon name="User" size={14} className="mr-1" />
                        <span>{announcement.author_name}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-muted-foreground mb-2 md:mb-0">
              © 2025 ЖК Ботанический. Все права защищены.
            </p>
            <div className="flex space-x-4 text-muted-foreground">
              <span className="flex items-center">
                <Icon name="Phone" size={16} className="mr-1" />
                +7 (846) 000-00-00
              </span>
              <span className="flex items-center">
                <Icon name="Mail" size={16} className="mr-1" />
                info@botanicheskiy.ru
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;