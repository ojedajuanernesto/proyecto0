import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { BookOpen, Users, Award, Clock, Calculator, Globe, Languages, Beaker } from "lucide-react";

export default function Niveles() {
  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Niveles Educativos</h1>
          <p className="text-blue-200 text-lg">Educación integral desde primaria hasta secundaria</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="overflow-hidden" hover>
              <div className="bg-primary p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <BookOpen className="w-12 h-12" />
                  <h2 className="text-3xl font-bold">Educación Primaria</h2>
                </div>
                <p className="text-blue-200">Grados 1° a 6° - Edades de 6 a 12 años</p>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-primary mb-4">Características del Nivel</h3>
                <p className="text-gray-600 mb-6">
                  Our primary education program focuses on the holistic development of children, fostering a love for learning through play, exploration, and structured academic activities.
                </p>
                
                <h4 className="font-semibold text-primary mb-3">Áreas Curriculares</h4>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Matemáticas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Comunicación</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Ciencias Naturales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Estudios Sociales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Inglés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Arte y Música</span>
                  </div>
                </div>

                <h4 className="font-semibold text-primary mb-3">Horarios</h4>
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span className="text-gray-700">Lunes a Viernes: 7:30 - 13:00</span>
                </div>

                <Button href="/admision" variant="secondary">Informes de Admisión</Button>
              </div>
            </Card>

            <Card className="overflow-hidden" hover>
              <div className="bg-secondary p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Users className="w-12 h-12" />
                  <h2 className="text-3xl font-bold">Educación Secundaria</h2>
                </div>
                <p className="text-red-200">Grados 7° a 12° - Edades de 12 a 18 años</p>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-primary mb-4">Características del Nivel</h3>
                <p className="text-gray-600 mb-6">
                  Our secondary education program prepares students for university and professional life, developing critical thinking, research skills, and personal responsibility.
                </p>
                
                <h4 className="font-semibold text-primary mb-3">Áreas Curriculares</h4>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Matemáticas Avanzadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Lenguaje y Literatura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Física y Química</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Historia y Geografía</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Inglés Técnico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-secondary" />
                    <span className="text-gray-700">Orientación Vocacional</span>
                  </div>
                </div>

                <h4 className="font-semibold text-primary mb-3">Horarios</h4>
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span className="text-gray-700">Lunes a Viernes: 7:30 - 14:30</span>
                </div>

                <Button href="/admision" variant="secondary">Informes de Admisión</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Actividades Extracurriculares</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 text-center" hover>
              <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-primary mb-2">Deportes</h3>
              <p className="text-gray-600 text-sm">Fútbol, baloncesto, volleyball y athletics</p>
            </Card>
            
            <Card className="p-6 text-center" hover>
              <div className="bg-purple-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-primary mb-2">Arte</h3>
              <p className="text-gray-600 text-sm">Música, teatro, danza y artes plásticas</p>
            </Card>
            
            <Card className="p-6 text-center" hover>
              <div className="bg-green-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Beaker className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-primary mb-2">Ciencia</h3>
              <p className="text-gray-600 text-sm">Robótica, club de ciencias y matemáticas</p>
            </Card>
            
            <Card className="p-6 text-center" hover>
              <div className="bg-red-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-primary mb-2">Idiomas</h3>
              <p className="text-gray-600 text-sm">Inglés avanzado y certificación</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
