'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'
import { Shield, Feather, Sparkles, Wrench, Thermometer, Infinity, Leaf, FlaskConical } from 'lucide-react'

// Icons as simple SVG components
const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#0099FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

const FishIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

const GiftIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
)

const HomeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const GaugeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

// Chemical resistance data
const chemicalData = [
  { substance: "Вода (холодная/горячая)", resistance: "Отлично", note: "Без ограничений" },
  { substance: "Морская вода", resistance: "Отлично", note: "Без ограничений" },
  { substance: "Соляная кислота (до 20%)", resistance: "Хорошо", note: "При комнатной температуре" },
  { substance: "Серная кислота (до 60%)", resistance: "Хорошо", note: "При комнатной температуре" },
  { substance: "Азотная кислота (до 10%)", resistance: "Хорошо", note: "Ограниченное применение" },
  { substance: "Уксусная кислота", resistance: "Отлично", note: "Без ограничений" },
  { substance: "Лимонная кислота", resistance: "Отлично", note: "Без ограничений" },
  { substance: "Едкий натр (до 50%)", resistance: "Хорошо", note: "При комнатной температуре" },
  { substance: "Аммиак", resistance: "Отлично", note: "Без ограничений" },
  { substance: "Этиловый спирт", resistance: "Отлично", note: "Без ограничений" },
  { substance: "Изопропиловый спирт", resistance: "Хорошо", note: "Ограниченное применение" },
  { substance: "Глицерин", resistance: "Отлично", note: "Без ограничений" },
  { substance: "Бензин", resistance: "Удовлетворительно", note: "Кратковременный контакт" },
  { substance: "Машинное масло", resistance: "Хорошо", note: "При комнатной температуре" },
  { substance: "Ацетон", resistance: "Не рекомендуется", note: "Разрушает материал" },
  { substance: "Бензол", resistance: "Не рекомендуется", note: "Разрушает материал" },
  { substance: "Хлор", resistance: "Удовлетворительно", note: "Только газообразный" },
]

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Профилеон" 
                width={48} 
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <span className="text-xl sm:text-2xl font-bold font-['Montserrat'] text-gray-900">
                Профилеон
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#products" className="text-gray-600 hover:text-[#0099FF] transition-colors font-medium">Продукция</a>
              <a href="#applications" className="text-gray-600 hover:text-[#0099FF] transition-colors font-medium">Применение</a>
              <a href="#faq" className="text-gray-600 hover:text-[#0099FF] transition-colors font-medium">FAQ</a>
              <a href="#contacts" className="text-gray-600 hover:text-[#0099FF] transition-colors font-medium">Контакты</a>
            </nav>
            <a href="#contacts" className="md:hidden">
              <Button className="bg-[#0099FF] hover:bg-[#0080DD] text-white">
                Связаться
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/many_tubes.jpeg"
            alt="Коллекция поликарбонатных труб"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-['Montserrat'] text-gray-900 leading-tight mb-4">
              Поликарбонатные трубы для{' '}
              <span className="bg-gradient-to-r from-[#0099FF] to-[#FF6600] bg-clip-text text-transparent">дома, хобби и творчества</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 leading-relaxed">
              Создайте свой светильник, аквариум или стильную упаковку своими руками
            </p>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
              Легко, красиво и прочно.
            </p>
            
            {/* Stock info card */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-glass border border-white/60">
              <h3 className="font-semibold text-gray-900 mb-4 font-['Montserrat']">В наличии на складе</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span><strong>Диаметры:</strong> от 8мм до 284мм</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span><strong>Цвета:</strong> прозрачные, опал, белые</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span><strong>Длина:</strong> от 500мм до 3000мм</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <span><strong>Производство:</strong> Россия</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Comparison Section */}
      <section className="py-16 sm:py-24 gradient-opal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/color_comparison.png"
                alt="Сравнение цветов поликарбонатных труб"
                width={512}
                height={512}
                className="rounded-2xl shadow-glass"
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Montserrat'] text-gray-900 mb-6">
                Прозрачность стекла и прочность пластика
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-card border border-white/50">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-gradient-to-br from-white to-blue-100 border border-gray-200"></span>
                    Прозрачные трубы
                  </h4>
                  <p className="text-gray-600">Кристально прозрачные с коэффициентом светопропускания <strong>до 90%</strong>. Идеальны для визуального контроля и максимальной прозрачности.</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-card border border-white/50">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300"></span>
                    Опаловые трубы
                  </h4>
                  <p className="text-gray-600">Напоминают матовое стекло, коэффициент светопропускания <strong>60-65%</strong>. Опаловые трубы &quot;светят&quot; — создают мягкое рассеянное свечение.</p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-card border border-white/50">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-white border-2 border-gray-300"></span>
                    Белые трубы
                  </h4>
                  <p className="text-gray-600">Более плотный белый цвет, коэффициент светопропускания <strong>50-55%</strong>. Белые трубы &quot;светятся&quot; — создают равномерную подсветку без бликов.</p>
                </div>
              </div>

              <p className="mt-6 text-gray-600">
                При производстве труб применяется сырьё с добавлением УФ защиты для долговечности.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Caps Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Montserrat'] text-gray-900 mb-6">
                Крышки-заглушки в наличии
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Завершите свой проект качественными крышками-заглушками для поликарбонатных труб. 
                Идеально подходят для создания светильников, упаковки и декоративных элементов.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 font-['Montserrat']">Доступные диаметры:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['15мм', '25мм', '30мм', '32мм', '54мм', '100мм', '110мм'].map((size) => (
                    <span key={size} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                      {size}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Цвета: <span className="font-medium">белые</span> и <span className="font-medium">прозрачные</span>
                </p>
                <p className="text-sm text-[#0099FF] font-medium mt-2">
                  ✓ В наличии на складе
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <Image
                src="/caps.jpg"
                alt="Крышки-заглушки для поликарбонатных труб"
                width={640}
                height={559}
                className="rounded-2xl shadow-glass"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="products" className="py-16 sm:py-24 gradient-opal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Montserrat'] text-gray-900 mb-4">
              8 преимуществ поликарбоната
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Поликарбонатные трубы. Не ржавеет. Не бьётся. Работает.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Прочность", desc: "Ударопрочность в 250 раз выше, чем у стекла", icon: Shield },
              { title: "Лёгкость", desc: "В 3 раза легче акрила и в 6 раз легче стекла", icon: Feather },
              { title: "Оптика", desc: "Светопропускаемость до 90% для прозрачных труб", icon: Sparkles },
              { title: "Гибкость", desc: "Легко режутся, гнутся, склеиваются, сверлятся", icon: Wrench },
              { title: "Термостойкость", desc: "Диапазон от -40°C до +120°C", icon: Thermometer },
              { title: "Долговечность", desc: "Не желтеют и не мутнеют с годами (УФ защита)", icon: Infinity },
              { title: "Экологичность", desc: "Отсутствие токсичных выделений", icon: Leaf },
              { title: "Химстойкость", desc: "Стойкость к щелочам, кислотам, растворителям", icon: FlaskConical },
            ].map((item, i) => {
              const IconComponent = item.icon
              const isBlue = i % 4 === 0 || i % 4 === 2
              const color = isBlue ? '#0099FF' : '#FF6600'
              return (
                <div key={i} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow border border-gray-100">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <IconComponent
                      className="w-5 h-5"
                      style={{ color: color }}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 font-['Montserrat']">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Chemical Resistance Table */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Montserrat'] text-gray-900 mb-4">
              Химическая стойкость поликарбоната
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Поликарбонат демонстрирует высокую устойчивость к широкому спектру химических веществ
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Вещество</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Стойкость</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900 hidden sm:table-cell">Примечание</th>
                </tr>
              </thead>
              <tbody>
                {chemicalData.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{item.substance}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        item.resistance === 'Отлично' ? 'bg-green-100 text-green-700' :
                        item.resistance === 'Хорошо' ? 'bg-blue-100 text-blue-700' :
                        item.resistance === 'Удовлетворительно' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.resistance}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section id="applications" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Montserrat'] text-gray-900 mb-4">
              Области применения
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Поликарбонатные трубы открывают безграничные возможности для творчества и практичного применения
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <LightbulbIcon />,
                title: "Светильники и подсветка",
                desc: "Создавайте уникальные торшеры, настольные лампы и декоративную подсветку. Опаловые трубы идеально рассеивают свет, создавая мягкое свечение.",
                image: "/lamp_example.png"
              },
              {
                icon: <FishIcon />,
                title: "Аквариумы и террариумы",
                desc: "Прозрачные трубы идеально подходят для создания систем фильтрации, декоративных элементов и перегородок в аквариумах и террариумах.",
                image: "/aquarium_example.png"
              },
              {
                icon: <GiftIcon />,
                title: "Подарочная упаковка",
                desc: "Создавайте оригинальные кейсы и тубусы для подарков. Прозрачные трубы позволяют увидеть содержимое, белые — добавляют загадочности.",
                image: "/pack.jpeg"
              },
              {
                icon: <HomeIcon />,
                title: "Интерьерный дизайн",
                desc: "Изготовление стоек, колонн, перил, каркасов для мебели, перегородок с подсветкой. Лёгкость обработки позволяет воплощать любые идеи.",
                image: "/partitions.jpeg"
              },
              {
                icon: <GaugeIcon />,
                title: "Контроль уровня жидкости",
                desc: "Прозрачные трубы отлично подходят для визуального контроля уровня жидкости в ёмкостях, бочках и резервуарах.",
                image: "/level.jpeg"
              },
              {
                icon: <GiftIcon />,
                title: "Декоративные поделки",
                desc: "Моделирование, хобби, рукоделие — поликарбонатные трубы станут отличным материалом для творческих проектов любой сложности.",
                image: "/dig_crafts.png"
              },
            ].map((item, i) => (
              <div key={i} className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-card hover:shadow-xl transition-all border border-gray-100">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    {item.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 font-['Montserrat'] text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 gradient-opal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Montserrat'] text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="q1" className="bg-white rounded-xl shadow-card border-0 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#0099FF] py-4">
                Чем режутся поликарбонатные трубы?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                Поликарбонатные трубы легко режются различными инструментами: ножовкой по металлу, электролобзиком, циркулярной пилой с мелкозубым диском, болгаркой с отрезным кругом. Для тонких труб можно использовать специальные ножницы для пластика. При резке рекомендуется использовать низкие обороты, чтобы избежать плавления краёв.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2" className="bg-white rounded-xl shadow-card border-0 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#0099FF] py-4">
                Как соединяются поликарбонатные трубы?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                Существует несколько способов соединения: склеивание специальными клеями для поликарбоната, механическое соединение с помощью фитингов и муфт, сварка горячим воздухом (для опытных пользователей), соединение на саморезы или заклёпки. Для герметичных соединений рекомендуется использовать силиконовые герметики.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3" className="bg-white rounded-xl shadow-card border-0 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#0099FF] py-4">
                Чем отличается цвет опал и белый?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                <strong>Опаловые трубы</strong> имеют коэффициент светопропускания 60-65% и визуально напоминают матовое стекло — они &quot;светят&quot;, пропуская свет и создавая мягкое рассеянное свечение. <strong>Белые трубы</strong> более плотные с коэффициентом 50-55% — они &quot;светятся&quot;, создавая равномерную подсветку без бликов. Белый цвет более насыщенный и непрозрачный.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4" className="bg-white rounded-xl shadow-card border-0 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#0099FF] py-4">
                Можно ли гнуть поликарбонатные трубы?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                Да, поликарбонатные трубы можно гнуть при нагреве до температуры около 150-180°C. Для этого используют строительный фен или термопистолет. Важно нагревать трубу равномерно по всей длине изгиба. После остывания труба сохраняет заданную форму. При комнатной температуре трубы остаются жёсткими.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5" className="bg-white rounded-xl shadow-card border-0 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#0099FF] py-4">
                Какой срок службы поликарбонатных труб?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                При правильном подборе сырья с УФ-защитой и правильной эксплуатации поликарбонатные трубы не желтеют и не мутнеют в течение 10-15 лет и более. Срок службы зависит от условий эксплуатации: при использовании внутри помещений трубы служат значительно дольше, чем при постоянном воздействии прямых солнечных лучей.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6" className="bg-white rounded-xl shadow-card border-0 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#0099FF] py-4">
                Безопасны ли поликарбонатные трубы для аквариумов?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                Да, поликарбонат экологически безопасен и не выделяет токсичных веществ. Он химически инертен к воде и безопасен для рыб и растений. Поликарбонат широко используется в аквариумистике для изготовления фильтров, переливов и декоративных элементов. Материал не влияет на pH воды и не содержит бисфенола-А в безопасных марках.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Montserrat'] text-gray-900 mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-lg text-gray-600">
              Звоните, пишите — мы поможем подобрать идеальное решение для вашего проекта
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-card border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 font-['Montserrat']">Форма обратной связи</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Ваше имя"
                    className="border-gray-300 focus:border-[#0099FF] focus:ring-[#0099FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="email@example.com"
                    className="border-gray-300 focus:border-[#0099FF] focus:ring-[#0099FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+7 (___) ___-__-__"
                    className="border-gray-300 focus:border-[#0099FF] focus:ring-[#0099FF]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows={4}
                    placeholder="Расскажите о вашем проекте..."
                    className="border-gray-300 focus:border-[#0099FF] focus:ring-[#0099FF]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#0099FF] hover:bg-[#0080DD] text-white py-3"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                </Button>
                
                {submitStatus === 'success' && (
                  <p className="text-green-600 text-center">Спасибо! Ваше сообщение отправлено.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-center">Произошла ошибка. Попробуйте позже.</p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#0099FF]/5 to-[#00FFFF]/5 rounded-2xl p-8 border border-[#0099FF]/10">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 font-['Montserrat']">Контактная информация</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0099FF]/10 rounded-xl flex items-center justify-center text-[#0099FF]">
                      <PhoneIcon />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Телефон</p>
                      <a href="tel:+79311197378" className="text-lg font-medium text-gray-900 hover:text-[#0099FF]">
                        +7 (931) 119-73-78
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0099FF]/10 rounded-xl flex items-center justify-center text-[#0099FF]">
                      <MailIcon />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href="mailto:info@profileon.ru" className="text-lg font-medium text-gray-900 hover:text-[#0099FF]">
                        info@profileon.ru
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-card border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 font-['Montserrat']">Где приобрести</h3>
                <p className="text-gray-600 mb-6">
                  Нашу продукцию можно приобрести на ведущих маркетплейсах:
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://www.ozon.ru/seller/profileon/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-200 hover:border-[#0099FF] hover:shadow-md transition-all"
                  >
                    <span className="font-semibold text-gray-900">OZON</span>
                  </a>
                  <a 
                    href="https://www.wildberries.ru/seller/250072565" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-200 hover:border-[#0099FF] hover:shadow-md transition-all"
                  >
                    <span className="font-semibold text-gray-900">Wildberries</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Профилеон" 
                width={40} 
                height={40}
                className="w-10 h-10"
              />
              <div>
                <span className="text-xl font-bold font-['Montserrat']">Профилеон</span>
                <p className="text-sm text-gray-400">Поликарбонатные трубы</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2026 Профилеон. Все права защищены.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Российское производство
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
