
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Book, Trophy, Edit, Settings, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

// Sample data - in a real app, this would come from an API
const mockUserData = {
  creator: {
    id: "creator-123",
    name: "Alex Johnson",
    bio: "Educational content creator specializing in web development and programming fundamentals.",
    role: "Creator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    joinedDate: "January 2022",
    courses: [
      { id: "course-1", title: "JavaScript Fundamentals", students: 1253, rating: 4.7 },
      { id: "course-2", title: "React for Beginners", students: 843, rating: 4.9 },
      { id: "course-3", title: "TypeScript Masterclass", students: 567, rating: 4.5 },
    ],
    stats: {
      totalStudents: 2663,
      totalCourses: 3,
      averageRating: 4.7
    }
  },
  learner: {
    id: "learner-456",
    name: "Sam Taylor",
    bio: "Software engineer passionate about continuous learning and new technologies.",
    role: "Learner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    joinedDate: "March 2023",
    enrolledCourses: [
      { id: "course-1", title: "JavaScript Fundamentals", progress: 75, instructor: "Alex Johnson" },
      { id: "course-2", title: "React for Beginners", progress: 30, instructor: "Alex Johnson" },
    ],
    completedCourses: [
      { id: "course-4", title: "HTML & CSS Basics", instructor: "Jamie Smith", completionDate: "April 2023" }
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
      variant: "success",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-12 w-1/3 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
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
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                  <Badge variant={user.role === "Creator" ? "success" : "secondary"} className="mb-3">
                    {user.role}
                  </Badge>
                  <p className="text-muted-foreground mb-4">{user.bio}</p>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined {user.joinedDate}</span>
                  </div>
                  
                  {user.role === "Creator" ? (
                    <div className="grid grid-cols-3 gap-2 w-full mb-6">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-bold">{user.stats.totalStudents}</div>
                        <div className="text-xs text-muted-foreground">Students</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-bold">{user.stats.totalCourses}</div>
                        <div className="text-xs text-muted-foreground">Courses</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-bold">{user.stats.averageRating}</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full mb-6">
                      <div className="text-sm font-medium mb-1">Achievements</div>
                      <div className="flex gap-2">
                        {user.achievements.map((achievement: any) => (
                          <div key={achievement.id} className="flex items-center justify-center w-8 h-8 bg-muted rounded-full" title={achievement.title}>
                            <span>{achievement.icon}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button onClick={handleFollowUser} className="w-full mb-2">
                    Follow
                  </Button>
                  <Button variant="outline" className="w-full">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
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
                  <TabsContent value="courses" className="space-y-4">
                    {user.courses.map((course: any) => (
                      <Card key={course.id} className="hover:border-primary transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription>
                            <div className="flex justify-between mt-2">
                              <span>{course.students} students</span>
                              <span className="flex items-center">
                                <span className="font-medium">{course.rating}</span>
                                <span className="text-yellow-500 ml-1">★</span>
                              </span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                    
                    <Button variant="outline" className="w-full mt-4">
                      <Book className="mr-2 h-4 w-4" />
                      View All Courses
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <Card>
                      <CardHeader>
                        <CardTitle>Student Reviews</CardTitle>
                        <CardDescription>What students are saying about your courses</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-md">
                            <div className="flex justify-between mb-2">
                              <div className="font-medium">Great Course!</div>
                              <div className="text-yellow-500">★★★★★</div>
                            </div>
                            <p className="text-sm text-muted-foreground">The explanations were clear and the exercises were very helpful.</p>
                            <div className="text-xs text-muted-foreground mt-2">For: JavaScript Fundamentals</div>
                          </div>
                          <div className="p-4 border rounded-md">
                            <div className="flex justify-between mb-2">
                              <div className="font-medium">Very Informative</div>
                              <div className="text-yellow-500">★★★★☆</div>
                            </div>
                            <p className="text-sm text-muted-foreground">I learned a lot from this course. The instructor explains concepts well.</p>
                            <div className="text-xs text-muted-foreground mt-2">For: React for Beginners</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="about">
                    <Card>
                      <CardHeader>
                        <CardTitle>About {user.name}</CardTitle>
                        <CardDescription>Creator information and expertise</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p>
                            {user.bio} With over 5 years of teaching experience, I specialize in making complex programming concepts accessible to beginners.
                          </p>
                          <div>
                            <h3 className="font-semibold mb-2">Areas of Expertise</h3>
                            <div className="flex flex-wrap gap-2">
                              <Badge>JavaScript</Badge>
                              <Badge>React</Badge>
                              <Badge>TypeScript</Badge>
                              <Badge>Web Development</Badge>
                            </div>
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
                  <TabsContent value="enrolled" className="space-y-4">
                    {user.enrolledCourses.map((course: any) => (
                      <Card key={course.id} className="hover:border-primary transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription>By {course.instructor}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground flex justify-between">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full mt-4">Continue Learning</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="completed">
                    <Card>
                      <CardHeader>
                        <CardTitle>Completed Courses</CardTitle>
                        <CardDescription>Courses you've successfully finished</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {user.completedCourses.length > 0 ? (
                          <div className="space-y-4">
                            {user.completedCourses.map((course: any) => (
                              <div key={course.id} className="p-4 border rounded-md flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{course.title}</div>
                                  <div className="text-sm text-muted-foreground">By {course.instructor}</div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <Badge variant="success" className="mb-1 flex items-center">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Completed
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{course.completionDate}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-4 text-muted-foreground">
                            <p>You haven't completed any courses yet.</p>
                            <Button variant="outline" className="mt-2">Browse Courses</Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="achievements">
                    <Card>
                      <CardHeader>
                        <CardTitle>Achievements</CardTitle>
                        <CardDescription>Milestones you've reached in your learning journey</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {user.achievements.map((achievement: any) => (
                            <div key={achievement.id} className="p-4 border rounded-md flex items-center">
                              <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full mr-3">
                                <span className="text-lg">{achievement.icon}</span>
                              </div>
                              <div>
                                <div className="font-medium">{achievement.title}</div>
                                <div className="text-sm text-muted-foreground">{achievement.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
