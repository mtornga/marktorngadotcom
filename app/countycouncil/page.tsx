import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CountyCouncilPage() {
    return (
        <main className="py-20 px-4">
            {/* Hero Section */}
            <div className="container min-h-[60vh] flex items-center justify-center mb-16">
                <Card className="max-w-4xl mx-auto text-center border-neo-thick" padding="lg">
                    <div className="inline-block bg-neo-primary text-white px-4 py-1 text-sm font-bold mb-6 transform -rotate-1 shadow-neo-sm">
                        VOTE 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
                        Mark Tornga<br />
                        <span className="text-neo-text/70">for County Council</span>
                    </h1>
                    <p className="text-2xl font-bold mb-8 max-w-4xl mx-auto">
                        St. Louis County has always been a place for excellent employers, top notch public schools, and world-class police and fire departments. <span className="text-neo-primary">Don't let it become a retirement community subsidized by working families.</span>
                    </p>
                    <div className="flex justify-center">
                        <Button href="#get-involved" variant="primary" className="text-xl px-8 py-4">
                            Get A Yard Sign
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Action Sections */}
            <div id="get-involved" className="container pb-20">
                <h2 className="text-4xl font-heading font-bold text-center mb-16">
                    Get Involved
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Give Energy */}
                    <Card className="h-full flex flex-col items-start" padding="md">
                        <div className="bg-neo-primary text-white p-3 mb-4 font-bold text-xl border-neo-sm shadow-neo-sm w-full text-center">
                            GIVE ENERGY
                        </div>
                        <ul className="space-y-4 mb-8 flex-grow">
                            <li className="flex items-start">
                                <span className="mr-2 text-neo-primary font-bold">→</span>
                                <span>Help me distribute leaflets</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-neo-primary font-bold">→</span>
                                <span>Help me deliver yard signs</span>
                            </li>
                        </ul>
                        <Button href="#" variant="secondary" className="w-full">
                            Volunteer
                        </Button>
                    </Card>

                    {/* Give Thoughts */}
                    <Card className="h-full flex flex-col items-start" padding="md">
                        <div className="bg-neo-accent text-neo-text p-3 mb-4 font-bold text-xl border-neo-sm shadow-neo-sm w-full text-center">
                            GIVE THOUGHTS
                        </div>
                        <ul className="space-y-4 mb-8 flex-grow">
                            <li className="flex items-start">
                                <span className="mr-2 text-neo-accent font-bold">→</span>
                                <span>Send me your concerns about the county</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-neo-accent font-bold">→</span>
                                <span>Share your other policy priorities</span>
                            </li>
                        </ul>
                        <Button href="#" variant="primary" className="w-full">
                            Contact Mark
                        </Button>
                    </Card>

                    {/* Give Money */}
                    <Card className="h-full flex flex-col items-start" padding="md">
                        <div className="bg-neo-text text-white p-3 mb-4 font-bold text-xl border-neo-sm shadow-neo-sm w-full text-center">
                            GIVE MONEY
                        </div>
                        <ul className="space-y-4 mb-8 flex-grow">
                            <li className="flex items-start">
                                <span className="mr-2 text-neo-text font-bold">→</span>
                                <span>Donate to the campaign</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-neo-text font-bold">→</span>
                                <span>Fund leaflet printing</span>
                            </li>
                        </ul>
                        <Button href="#" variant="accent" className="w-full">
                            Donate Now
                        </Button>
                    </Card>
                </div>
            </div>

            {/* Final CTA */}
            <div className="container text-center py-12">
                <div className="inline-block transform rotate-1">
                    <Button href="#" variant="primary" className="text-2xl px-12 py-6 border-neo-thick shadow-neo-lg hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-neo-hover">
                        GET A YARD SIGN NOW
                    </Button>
                </div>
            </div>

        </main>
    );
}
