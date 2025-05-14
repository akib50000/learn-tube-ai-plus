
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Book, Trophy, Edit, Settings, CheckCircle, MapPin, Star, Users, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Sample data - in a real app, this would come from an API
const mockUserData = {
  creator: {
    id: "creator-123",
    name: "Alex Johnson",
    bio: "Educational content creator specializing in web development and programming fundamentals.",
    role: "Creator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    coverPhoto: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    location: "San Francisco, CA",
    joinedDate: "January 2022",
    courses: [
      { 
        id: "course-1", 
        title: "JavaScript Fundamentals", 
        students: 1253, 
        rating: 4.7, 
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        price: 49.99
      },
      { 
        id: "course-2", 
        title: "React for Beginners", 
        students: 843, 
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        price: 59.99 
      },
      { 
        id: "course-3", 
        title: "TypeScript Masterclass", 
        students: 567, 
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1599837565318-25315cd55c12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHlwZXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        price: 69.99
      },
    ],
    stats: {
      totalStudents: 2663,
      totalCourses: 3,
      averageRating: 4.7
    },
    socialMedia: {
      twitter: "https://twitter.com/alexjohnson",
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson"
    }
  },
  learner: {
    id: "learner-456",
    name: "Sam Taylor",
    bio: "Software engineer passionate about continuous learning and new technologies.",
    role: "Learner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    coverPhoto: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
    location: "Austin, TX",
    joinedDate: "March 2023",
    enrolledCourses: [
      { 
        id: "course-1", 
        title: "JavaScript Fundamentals", 
        progress: 75, 
        instructor: "Alex Johnson",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      },
      { 
        id: "course-2", 
        title: "React for Beginners", 
        progress: 30, 
        instructor: "Alex Johnson",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      },
    ],
    completedCourses: [
      { 
        id: "course-4", 
        title: "HTML & CSS Basics", 
        instructor: "Jamie Smith", 
        completionDate: "April 2023",
        image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHRtbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      }
    ],
    achievements: [
      { id: "ach-1", title: "Fast Learner", description: "Completed 5 lessons in one day", icon: "🚀" },
      { id: "ach-2", title: "Consistent", description: "Logged in for 7 consecutive days", icon: "🔥" },
    ]
  }
};

const ProfilePage = () => {
  const { userId, role } = useParams();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (role === "creator") {
        setUser(mockUserData.creator);
      } else {
        setUser(mockUserData.learner);
      }
      setIsLoading(false);
    }, 500);
  }, [role]);

  const handleFollowUser = () => {
    toast({
      title: `Now following ${user?.name}`,
      description: "You'll receive updates about their new content.",
      duration: 3000,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="w-full h-60 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="flex gap-6">
              <div className="h-32 w-32 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0"></div>
              <div className="flex-1">
                <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                <div className="h-16 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-2">User Not Found</h1>
          <p className="text-muted-foreground">The requested user profile doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Cover photo */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={user.coverPhoto} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="container pb-12">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row gap-6 -mt-16 relative z-10 mb-8">
          <div className="flex-shrink-0">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 pt-16 md:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <Badge variant={user.role === "Creator" ? "success" : "secondary"} className="sm:ml-2">
                {user.role}
              </Badge>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
              {user.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Joined {user.joinedDate}</span>
              </div>
              {user.role === "Creator" && (
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{user.stats.totalStudents} students</span>
                </div>
              )}
            </div>
            
            <p className="mb-4 text-muted-foreground">{user.bio}</p>
            
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleFollowUser} className="airbnb-btn-primary">
                Follow
              </Button>
              <Button variant="outline">
                Message
              </Button>
            </div>
          </div>
        </div>
        
        {/* Stats cards for Creator */}
        {user.role === "Creator" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="airbnb-card hover:shadow-airbnb transition-shadow">
              <CardContent className="p-6 flex gap-4 items-center">
                <div className="h-12 w-12 bg-learntube-red/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-learntube-red" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{user.stats.totalStudents}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="airbnb-card hover:shadow-airbnb transition-shadow">
              <CardContent className="p-6 flex gap-4 items-center">
                <div className="h-12 w-12 bg-learntube-red/10 rounded-full flex items-center justify-center">
                  <Book className="h-6 w-6 text-learntube-red" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                  <p className="text-2xl font-bold">{user.stats.totalCourses}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="airbnb-card hover:shadow-airbnb transition-shadow">
              <CardContent className="p-6 flex gap-4 items-center">
                <div className="h-12 w-12 bg-learntube-red/10 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-learntube-red" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{user.stats.averageRating}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Main Content */}
        <Tabs defaultValue={user.role === "Creator" ? "courses" : "enrolled"} className="w-full">
          <TabsList className="mb-6">
            {user.role === "Creator" ? (
              <>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </>
            )}
          </TabsList>
          
          {/* Creator Tabs */}
          {user.role === "Creator" && (
            <>
              <TabsContent value="courses">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.courses.map((course: any) => (
                    <Card key={course.id} className="airbnb-card overflow-hidden hover:shadow-airbnb transition-shadow duration-300">
                      <div className="relative">
                        <AspectRatio ratio={16/9} className="bg-muted">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                        <div className="absolute top-3 right-3">
                          <Button variant="ghost" size="icon" className="rounded-full bg-white/90 hover:bg-white text-learntube-red">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex items-center gap-1 text-sm mb-2">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                          <span className="text-muted-foreground">({course.students} students)</span>
                        </div>
                        
                        <h3 className="font-bold mb-3">{course.title}</h3>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">${course.price}</span>
                          <Button variant="outline" size="sm">View Course</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border">
                    <div className="flex justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar>
                            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                            <AvatarFallback>DC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">David Chen</p>
                            <p className="text-sm text-muted-foreground">2 weeks ago</p>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        for <span className="font-medium text-foreground">JavaScript Fundamentals</span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      This course was exactly what I needed to jump into JavaScript development. The instructor explains concepts clearly and the exercises help reinforce what you learn. I especially appreciated the section on async programming.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border">
                    <div className="flex justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar>
                            <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-sm text-muted-foreground">1 month ago</p>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        for <span className="font-medium text-foreground">React for Beginners</span>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Excellent course! I went from knowing nothing about React to building my own applications. The instructor is knowledgeable and explains concepts in a way that's easy to understand. The project-based approach really helps cement the knowledge.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="about">
                <Card className="airbnb-card">
                  <CardHeader>
                    <CardTitle>About {user.name}</CardTitle>
                    <CardDescription>Creator information and expertise</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <p className="leading-relaxed">
                        {user.bio} With over 5 years of teaching experience, I specialize in making complex programming concepts accessible to beginners. 
                        My courses focus on practical, project-based learning that gets you building real applications from day one.
                      </p>
                      <div>
                        <h3 className="font-semibold mb-3">Areas of Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-learntube-red/10 text-learntube-red hover:bg-learntube-red/20 rounded-full px-3">JavaScript</Badge>
                          <Badge className="bg-learntube-red/10 text-learntube-red hover:bg-learntube-red/20 rounded-full px-3">React</Badge>
                          <Badge className="bg-learntube-red/10 text-learntube-red hover:bg-learntube-red/20 rounded-full px-3">TypeScript</Badge>
                          <Badge className="bg-learntube-red/10 text-learntube-red hover:bg-learntube-red/20 rounded-full px-3">Web Development</Badge>
                          <Badge className="bg-learntube-red/10 text-learntube-red hover:bg-learntube-red/20 rounded-full px-3">Node.js</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3">Teaching Style</h3>
                        <p className="leading-relaxed">
                          I believe in learning by doing. My courses involve hands-on projects that reinforce concepts and build your portfolio along the way. 
                          I break down complex topics into manageable pieces and provide comprehensive explanations with real-world examples.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
          
          {/* Learner Tabs */}
          {user.role === "Learner" && (
            <>
              <TabsContent value="enrolled">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.enrolledCourses.map((course: any) => (
                    <Card key={course.id} className="airbnb-card overflow-hidden hover:shadow-airbnb transition-shadow duration-300">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/3">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover aspect-video sm:aspect-auto"
                          />
                        </div>
                        <div className="p-4 sm:w-2/3 flex flex-col">
                          <h3 className="font-bold mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">By {course.instructor}</p>
                          
                          <div className="space-y-2 mt-auto">
                            <div className="text-sm text-muted-foreground flex justify-between">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-learntube-red h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                            <Button className="w-full airbnb-btn-primary mt-3">Continue Learning</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed">
                <div className="space-y-4">
                  {user.completedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {user.completedCourses.map((course: any) => (
                        <Card key={course.id} className="airbnb-card overflow-hidden hover:shadow-airbnb transition-shadow duration-300">
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/3">
                              <img 
                                src={course.image} 
                                alt={course.title}
                                className="w-full h-full object-cover aspect-video sm:aspect-auto"
                              />
                            </div>
                            <div className="p-4 sm:w-2/3 flex flex-col">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold">{course.title}</h3>
                                <Badge variant="success" className="flex items-center">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Completed
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">By {course.instructor}</p>
                              <p className="text-xs text-muted-foreground mt-1">{course.completionDate}</p>
                              
                              <div className="mt-auto pt-4">
                                <Button variant="outline" className="w-full">View Certificate</Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/30 rounded-xl border">
                      <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No completed courses yet</h3>
                      <p className="text-muted-foreground mb-4">Complete your enrolled courses to see them here</p>
                      <Button variant="outline">Browse Courses</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="achievements">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.achievements.map((achievement: any) => (
                    <Card key={achievement.id} className="airbnb-card hover:shadow-airbnb transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="h-16 w-16 bg-learntube-red/10 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">{achievement.icon}</span>
                          </div>
                          <h3 className="font-bold mb-1">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Locked achievements */}
                  <Card className="border-dashed border-2 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center text-muted-foreground">
                        <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                          <Trophy className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="font-bold mb-1">Course Master</h3>
                        <p className="text-sm">Complete 5 courses to unlock</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed border-2 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center text-muted-foreground">
                        <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                          <Trophy className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="font-bold mb-1">Community Builder</h3>
                        <p className="text-sm">Post 10 helpful comments to unlock</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
