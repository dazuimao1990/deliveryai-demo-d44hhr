import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronRight, MapPin, QrCode, Sparkles, Users } from 'lucide-react'
import hotpot from '@/assets/hotpot.jpg'
import { products } from '@/data/menu'
import { Button } from '@/components/ui/button'
import { money } from '@/lib/utils'

const tableOptions = [
  { code: 'A08', areaKey: 'bind.area.hall', seats: 4 },
  { code: 'B12', areaKey: 'bind.area.booth', seats: 6 },
  { code: 'C06', areaKey: 'bind.area.room', seats: 4 },
  { code: 'D03', areaKey: 'bind.area.window', seats: 6 },
]

interface HomeViewProps { onBind: (table: string) => void }

export function HomeView({ onBind }: HomeViewProps) {
  const { t } = useTranslation()

  const recommendedDishes = useMemo(() => {
    const withBadge = products.filter((p) => p.badge)
    if (withBadge.length >= 3) return withBadge.slice(0, 3)
    const withoutBadge = products.filter((p) => !p.badge)
    return [...withBadge, ...withoutBadge].slice(0, 3)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-rice-100 paper-noise">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-chili-100 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-amber-100 blur-3xl" />
      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-6 px-5 py-8 lg:grid-cols-2 lg:gap-10 lg:px-10">
        {/* 品牌介绍 */}
        <section className="animate-rise order-1 lg:col-start-1 lg:row-start-1">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-chili-500/20 bg-white/80 px-3 py-2 text-xs font-bold text-chili-600 shadow-sm">
            <Sparkles size={14} /> {t('common.concept_badge')}
          </div>
          <p className="mb-2 text-sm font-bold tracking-widest text-chili-500">{t('common.concept_en')}</p>
          <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-charcoal-900 sm:text-5xl lg:text-6xl">
            {t('bind.title_l1')}<br /><span className="text-chili-500">{t('bind.title_l2')}</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-charcoal-500 sm:text-base">{t('bind.desc')}</p>
          <div className="mt-5 hidden flex-wrap gap-3 text-sm text-charcoal-700 sm:flex">
            {[t('bind.feature1'), t('bind.feature2'), t('bind.feature3')].map((item) => (
              <span key={item} className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm"><Check size={15} className="text-chili-500" />{item}</span>
            ))}
          </div>
        </section>

        {/* 桌台绑定 */}
        <section className="animate-rise order-3 rounded-3xl border border-white/80 bg-white/90 p-4 shadow-float backdrop-blur sm:p-6 lg:col-start-2 lg:row-start-1">
          <div className="relative mb-6 h-36 overflow-hidden rounded-2xl sm:h-56">
            <img src={hotpot} alt={t('bind.img_alt')} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div><p className="text-xs opacity-80">{t('common.simulated_store')}</p><h2 className="text-xl font-bold">{t('common.store_name')}</h2></div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">{t('common.open')}</span>
            </div>
          </div>
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-rice-100 p-4">
            <span className="rounded-xl bg-white p-3 text-chili-500 shadow-sm"><QrCode /></span>
            <div className="min-w-0 flex-1"><p className="font-bold text-charcoal-900">{t('bind.qr_title')}</p><p className="text-sm text-charcoal-500">{t('bind.qr_desc')}</p></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tableOptions.map(({ code, areaKey, seats }, index) => (
              <button key={code} onClick={() => onBind(code)} className="group rounded-2xl border border-charcoal-900/10 bg-white p-4 text-left transition hover:-translate-y-1 hover:border-chili-500 hover:shadow-card">
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-rice-100 text-sm font-extrabold text-chili-500">{index + 1}</span>
                <p className="font-bold text-charcoal-900">{code} · {t(areaKey)}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-charcoal-500"><Users size={13} /> {t('bind.seats', { count: seats })}</p>
                <ChevronRight size={17} className="ml-auto mt-2 text-charcoal-500 transition group-hover:translate-x-1 group-hover:text-chili-500" />
              </button>
            ))}
          </div>
          <Button onClick={() => onBind('A08')} className="mt-4 w-full"><MapPin size={17} />{t('bind.quick_enter')}</Button>
        </section>

        {/* 推荐菜 */}
        <section className="animate-rise order-2 lg:col-span-2 lg:col-start-1 lg:row-start-2">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-charcoal-900 sm:text-xl">{t('home.recommend_title')}</h2>
              <p className="mt-1 text-sm text-charcoal-500">{t('home.recommend_subtitle')}</p>
            </div>
            <Sparkles size={20} className="text-amber-400" />
          </div>
          {recommendedDishes.length > 0 ? (
            <div className="scrollbar-none -mx-1 flex gap-3 overflow-x-auto px-1 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0">
              {recommendedDishes.map((dish) => (
                <article key={dish.id} className="group shrink-0 overflow-hidden rounded-2xl border border-charcoal-900/5 bg-white shadow-card transition hover:-translate-y-1 lg:shrink">
                  <div className="relative h-32 w-44 overflow-hidden sm:h-36 sm:w-full lg:h-40">
                    <img src={dish.image} alt={t(dish.name)} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 to-transparent" />
                    {dish.badge && <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-charcoal-900">{t(dish.badge)}</span>}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-extrabold text-charcoal-900">{t(dish.name)}</h3>
                    <p className="mt-1 line-clamp-1 text-xs text-charcoal-500">{t(dish.description)}</p>
                    <p className="mt-2 text-lg font-extrabold text-chili-500">{money(dish.price)} <small className="text-xs font-medium text-charcoal-500">{t('menu.from')}</small></p>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  )
}
