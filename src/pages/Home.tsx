import React from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ui/ProjectCard';
import { HeroSlider } from '../components/sections/HeroSlider';
import { AmenitiesCarousel } from '../components/sections/AmenitiesCarousel';

const Home: React.FC = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <HeroSlider />

            {/* Featured Projects Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold mb-4 text-secondary">Featured Projects</h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Discover our diverse range of residential projects, each designed to offer a unique lifestyle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.slice(0, 3).map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href="/projects">
                            <Button variant="primary" size="lg" className="gap-2">
                                View All Projects <ArrowRight size={20} />
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <AmenitiesCarousel />

            {/* About Section */}
            <section className="py-20 bg-primary/20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-serif font-bold mb-6 text-secondary">Welcome to Life Republic</h2>
                    <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-lg">
                        Life Republic is a 390+ acre township nestled amidst nature, designed to offer a holistic lifestyle.
                        With world-class amenities, robust infrastructure, and a vibrant community, it is the perfect place to build your dream home.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
