import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ARTIST_IMAGE = "https://cdn.poehali.dev/projects/9515749e-1233-4a8d-8803-5a1b96e32458/files/bb729f2f-cb8c-4bee-8444-eee4f50357ce.jpg";

const TRACKS = [
  { id: 1, title: "Твоя любовь показуха", duration: "—", vk: "https://vk.ru/audio870066396_456239595_22b19b10a907859aa5", yandex: "https://music.yandex.ru/search?text=твоя+любовь+показуха+hellraiser" },
  { id: 2, title: "Генератор идей", duration: "—", vk: "https://vk.com/music/search?q=генератор+идей+hellraiser", yandex: "https://music.yandex.ru/search?text=генератор+идей+hellraiser" },
];

const RELEASES = [
  { id: 1, title: "Твоя любовь показуха", year: "2025", type: "СИНГЛ", tracks: 1 },
  { id: 2, title: "Генератор идей", year: "2025", type: "СИНГЛ", tracks: 1 },
];

const MERCH = [
  { id: 1, title: "HELLRAISER HOODIE", price: "4 500 ₽", desc: "Чёрный оверсайз худи" },
  { id: 2, title: "RITUAL TEE", price: "2 200 ₽", desc: "Футболка с принтом" },
  { id: 3, title: "CHAOS CAP", price: "1 800 ₽", desc: "Кепка пятипанельная" },
  { id: 4, title: "VINYL SET", price: "3 600 ₽", desc: "Виниловый комплект" },
];

const SOCIALS = [
  { name: "VK Музыка", handle: "HellRaiSeR", icon: "Music", url: "https://vk.ru/audio870066396_456239595_22b19b10a907859aa5" },
  { name: "Яндекс Музыка", handle: "HellRaiSeR", icon: "Radio", url: "https://music.yandex.ru/search?text=hellraiser" },
  { name: "Telegram", handle: "Написать артисту", icon: "Send", url: "#" },
];

const COMMENTS_INIT = [
  { id: 1, user: "Слушатель", text: "«Твоя любовь показуха» — зацепило с первых секунд", time: "недавно" },
];

const NAV_ITEMS = ["ГЛАВНАЯ", "О АРТИСТЕ", "РЕЛИЗЫ", "МЕРЧ", "СОЦСЕТИ"];

export default function Index() {
  const [activeSection, setActiveSection] = useState("ГЛАВНАЯ");
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(COMMENTS_INIT);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const togglePlay = (id: number) => {
    if (playingTrack === id) {
      setPlayingTrack(null);
      setProgress(0);
      if (progressRef.current) clearInterval(progressRef.current);
    } else {
      setPlayingTrack(id);
      setProgress(0);
      if (progressRef.current) clearInterval(progressRef.current);
      progressRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(progressRef.current!);
            setPlayingTrack(null);
            return 0;
          }
          return p + 0.5;
        });
      }, 100);
    }
  };

  useEffect(() => {
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, []);

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments([{ id: Date.now(), user: "Гость", text: newComment, time: "только что" }, ...comments]);
    setNewComment("");
  };

  return (
    <div className="bg-void text-ghost min-h-screen font-body overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-void/90 backdrop-blur-md border-b border-white/5">
        <span className="font-display text-xl tracking-[0.3em] text-crimson font-bold">HELLRAISER</span>
        <div className="hidden md:flex gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`font-display text-xs tracking-[0.25em] transition-colors duration-200 ${
                activeSection === item ? "text-crimson" : "text-ghost/50 hover:text-ghost"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <button className="md:hidden text-ghost" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-void flex flex-col items-center justify-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="font-display text-2xl tracking-[0.3em] text-ghost hover:text-crimson transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="ГЛАВНАЯ" className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ARTIST_IMAGE} alt="HellRaiSeR" className="w-full h-full object-cover object-top opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-void/40" />
        </div>

        <div className="relative z-10 px-6 md:px-16 lg:px-24 w-full">
          <div className="max-w-4xl">
            <p className="font-display text-xs tracking-[0.5em] text-crimson mb-4">OFFICIAL SITE</p>
            <h1 className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-none tracking-tight font-bold text-ghost mb-6">
              HELL<br />
              <span className="text-crimson">RAI</span>SeR
            </h1>
            <p className="font-body text-ghost/60 text-lg mb-10 max-w-md">
              Начинающий артист. Разные стили.<br />Честные эмоции в каждом треке.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => scrollToSection("РЕЛИЗЫ")}
                className="btn-primary px-8 py-3 font-display text-sm tracking-[0.2em]"
              >
                СЛУШАТЬ
              </button>
              <button
                onClick={() => scrollToSection("МЕРЧ")}
                className="btn-outline px-8 py-3 font-display text-sm tracking-[0.2em]"
              >
                МЕРЧ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="О АРТИСТЕ" className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-display text-xs tracking-[0.5em] text-crimson mb-4">О АРТИСТЕ</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-ghost mb-8 leading-tight">
              МУЗЫКА<br />КАК<br /><span className="text-stroke">ОРУЖИЕ</span>
            </h2>
            <div className="space-y-4 text-ghost/60 font-body leading-relaxed">
              <p>
                HellRaiSeR — электронный музыкант, работающий на пересечении dark electronic, industrial и ambient.
                Более 8 лет создаёт звуки, которые невозможно игнорировать.
              </p>
              <p>
                Каждый трек — это путешествие в пространство между сознанием и хаосом.
                Живые выступления превращаются в ритуал.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[["8+", "ЛЕТ"], ["500K+", "СЛУШАТЕЛЕЙ"], ["3", "АЛЬБОМА"]].map(([num, label]) => (
                <div key={label} className="border-t border-crimson/30 pt-4">
                  <div className="font-display text-3xl font-bold text-crimson">{num}</div>
                  <div className="font-display text-xs tracking-[0.2em] text-ghost/40 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden">
              <img src={ARTIST_IMAGE} alt="HellRaiSeR" className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 border border-crimson/20" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-void to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-crimson/30" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-crimson/10" />
          </div>
        </div>
      </section>

      {/* PLAYER + RELEASES */}
      <section id="РЕЛИЗЫ" className="py-20 bg-surface">
        <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <p className="font-display text-xs tracking-[0.5em] text-crimson mb-4">ПЛЕЕР</p>
          <h2 className="font-display text-4xl font-bold text-ghost mb-12">ТРЕКИ</h2>

          <div className="space-y-1 mb-20">
            {TRACKS.map((track, i) => (
              <div
                key={track.id}
                onClick={() => togglePlay(track.id)}
                className={`group flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-300 border-b border-white/5 ${
                  playingTrack === track.id ? "bg-crimson/10 border-crimson/20" : "hover:bg-white/[0.03]"
                }`}
              >
                <div className="w-8 text-center">
                  {playingTrack === track.id ? (
                    <div className="flex items-end gap-0.5 h-4 justify-center">
                      {[100, 60, 80].map((h, b) => (
                        <div
                          key={b}
                          className="w-1 bg-crimson animate-pulse rounded-full"
                          style={{ height: `${h}%`, animationDelay: `${b * 0.15}s` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="font-display text-xs text-ghost/30 group-hover:hidden">{String(i + 1).padStart(2, "0")}</span>
                  )}
                  {playingTrack !== track.id && (
                    <Icon name="Play" size={14} className="hidden group-hover:block text-crimson mx-auto" />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-display text-sm tracking-widest ${playingTrack === track.id ? "text-crimson" : "text-ghost"}`}>
                    {track.title}
                  </div>
                  {playingTrack === track.id && (
                    <div className="mt-2 h-0.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-crimson transition-all duration-100 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>
                <span className="font-body text-xs text-ghost/30">{track.plays}</span>
                <span className="font-body text-xs text-ghost/30 w-10 text-right">{track.duration}</span>
                <Icon
                  name={playingTrack === track.id ? "Pause" : "Play"}
                  size={16}
                  className={playingTrack === track.id ? "text-crimson" : "text-ghost/20 group-hover:text-ghost/60"}
                />
              </div>
            ))}
          </div>

          <p className="font-display text-xs tracking-[0.5em] text-crimson mb-4">ДИСКОГРАФИЯ</p>
          <h2 className="font-display text-4xl font-bold text-ghost mb-10">РЕЛИЗЫ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RELEASES.map((rel) => (
              <div key={rel.id} className="group relative overflow-hidden border border-white/10 p-6 hover:border-crimson/40 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-crimson/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="font-display text-[10px] tracking-[0.3em] text-crimson/60 mb-3">{rel.type} · {rel.year}</div>
                  <div className="font-display text-lg font-bold text-ghost mb-1">{rel.title}</div>
                  <div className="font-body text-xs text-ghost/40">{rel.tracks} {rel.tracks === 1 ? "трек" : "треков"}</div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <Icon name="ExternalLink" size={14} className="text-ghost/20 group-hover:text-crimson transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MERCH */}
      <section id="МЕРЧ" className="py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <p className="font-display text-xs tracking-[0.5em] text-crimson mb-4">МАГАЗИН</p>
        <h2 className="font-display text-4xl font-bold text-ghost mb-12">МЕРЧ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MERCH.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 bg-surface aspect-square flex items-center justify-center border border-white/5 group-hover:border-crimson/30 transition-all duration-300">
                <Icon name="ShoppingBag" size={40} className="text-ghost/10 group-hover:text-crimson/30 transition-colors duration-300" />
                <div className="absolute inset-0 bg-crimson/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="font-display text-sm tracking-[0.15em] text-ghost mb-1">{item.title}</div>
              <div className="font-body text-xs text-ghost/40 mb-2">{item.desc}</div>
              <div className="flex items-center justify-between">
                <span className="font-display text-crimson font-bold">{item.price}</span>
                <button className="font-display text-[10px] tracking-[0.2em] text-ghost border border-white/20 hover:border-crimson hover:text-crimson px-3 py-1.5 transition-all duration-200">
                  КУПИТЬ
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIALS */}
      <section id="СОЦСЕТИ" className="py-20 bg-surface">
        <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <p className="font-display text-xs tracking-[0.5em] text-crimson mb-4">ПОДПИСЫВАЙСЯ</p>
          <h2 className="font-display text-4xl font-bold text-ghost mb-12">СОЦСЕТИ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOCIALS.map((s) => (
              <div key={s.name} className="group flex items-center gap-4 p-6 border border-white/10 hover:border-crimson/40 cursor-pointer transition-all duration-300 hover:bg-crimson/5">
                <div className="w-10 h-10 border border-white/10 group-hover:border-crimson/40 flex items-center justify-center transition-all duration-300">
                  <Icon name={s.icon} fallback="Music" size={18} className="text-ghost/40 group-hover:text-crimson transition-colors" />
                </div>
                <div>
                  <div className="font-display text-sm tracking-wider text-ghost">{s.name}</div>
                  <div className="font-body text-xs text-ghost/40">{s.handle}</div>
                </div>
                <Icon name="ArrowRight" size={14} className="ml-auto text-ghost/20 group-hover:text-crimson transition-all duration-300 group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENTS */}
      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-4xl mx-auto">
        <p className="font-display text-xs tracking-[0.5em] text-crimson mb-4">ФАНАТЫ</p>
        <h2 className="font-display text-4xl font-bold text-ghost mb-12">КОММЕНТАРИИ</h2>

        <div className="mb-8 flex gap-3">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addComment()}
            placeholder="Оставить комментарий..."
            className="flex-1 bg-surface border border-white/10 focus:border-crimson/40 outline-none px-5 py-3 font-body text-sm text-ghost placeholder:text-ghost/20 transition-colors"
          />
          <button onClick={addComment} className="btn-primary px-6 py-3 font-display text-xs tracking-[0.2em]">
            ОТПРАВИТЬ
          </button>
        </div>

        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="border-l-2 border-crimson/30 pl-6 py-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-display text-xs tracking-wider text-ghost">{c.user}</span>
                <span className="font-body text-xs text-ghost/30">{c.time}</span>
              </div>
              <p className="font-body text-sm text-ghost/70">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-display text-sm tracking-[0.3em] text-crimson">HELLRAISER</span>
          <span className="font-body text-xs text-ghost/20">© 2024 HellRaiSeR. Все права защищены.</span>
          <div className="flex gap-4">
            {SOCIALS.map((s) => (
              <button key={s.name}>
                <Icon name={s.icon} fallback="Music" size={16} className="text-ghost/20 hover:text-crimson transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}