import Card from "@/components/ui/Card";
import { Shirt, Scissors, CheckCircle } from "lucide-react";

const uniforme = {
  ninos: [
    { nombre: "Camisa", descripcion: "Camisa azul con logo bordado del instituto", color: "Azul" },
    { nombre: "Pantalón", descripcion: "Pantalón de vestir gris", color: "Gris" },
    { nombre: "Zapatos", descripcion: "Zapatos negros escolares", color: "Negro" },
    { nombre: "Medias", descripcion: "Medias grises hasta la rodilla", color: "Gris" },
    { nombre: "Chaqueta", descripcion: "Chaqueta azul con cierre (opcional)", color: "Azul" },
  ],
  ninas: [
    { nombre: "Camisa", descripcion: "Camisa azul con logo bordado del instituto", color: "Azul" },
    { nombre: "Falda", descripcion: "Falda plisada gris (primaria) / Pantalón (secundaria)", color: "Gris" },
    { nombre: "Zapatos", descripcion: "Zapatos negros escolares", color: "Negro" },
    { nombre: "Medias", descripcion: "Medias grises o calcetines", color: "Gris" },
    { nombre: "Chaqueta", descripcion: "Chaqueta azul con cierre (opcional)", color: "Azul" },
  ],
};

const utiles = [
  "Cuadernos quadrupleargued (líneas y cuadriculados)",
  "Lápices, lapiceros, borradores, sacapuntas",
  "Regla, escuadra, transportador, compás",
  "Colores, marcadores, pegamento, tijeras",
  "Carpeta de proyectos",
  "Diccionario de español e inglés",
  "Calculadora científica (secundaria)",
];

export default function Uniforme() {
  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Guía de Uniforme</h1>
          <p className="text-blue-200 text-lg">使用条规定 规定 规定</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Uniforme Escolar</h2>
              <p className="text-gray-600">
                El uso del uniforme escolar es obligatorio. Favor de asegurar que su hijo/a asista diariamente con el uniforme completo y en buenas condiciones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="overflow-hidden" hover>
                <div className="bg-primary p-6 text-white text-center">
                  <Shirt className="w-12 h-12 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">Uniforme para Niños</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {uniforme.ninos.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold text-primary">{item.nombre}</span>
                          <p className="text-gray-600 text-sm">{item.descripcion}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Card className="overflow-hidden" hover>
                <div className="bg-secondary p-6 text-white text-center">
                  <Shirt className="w-12 h-12 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">Uniforme para Niñas</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {uniforme.ninas.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold text-primary">{item.nombre}</span>
                          <p className="text-gray-600 text-sm">{item.descripcion}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8" hover>
              <div className="flex items-start gap-4 mb-6">
                <Scissors className="w-12 h-12 text-secondary flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Uniforme de Educación Física</h3>
                  <p className="text-gray-600">
                    Para las clases de educación física, los alumnos deben usar:
                  </p>
                </div>
              </div>
              <ul className="grid md:grid-cols-2 gap-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span className="text-gray-700">Polo blanco del instituto</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span className="text-gray-700">Pantalón de buzo azul</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span className="text-gray-700">Zapatillas deportivas blancas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span className="text-gray-700">Medias deportivas blancas</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8" hover>
              <h3 className="text-2xl font-bold text-primary mb-6">Lista de Útiles Escolares</h3>
              <p className="text-gray-600 mb-6">
                Los útiles escolares deben ser marcados con el nombre del alumno. A continuación, la lista de materiales requeridos:
              </p>
              <ul className="grid md:grid-cols-2 gap-3">
                {utiles.map((util, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-gray-700">{util}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Normas de Presentación Personal</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 p-6 rounded-lg">
              <p className="text-white font-semibold">Cabello limpio y peinado</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <p className="text-white font-semibold">Uñas cortas y limpias</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <p className="text-white font-semibold">Sin maquillaje ni joyas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
