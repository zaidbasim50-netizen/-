// قائمة منتجات التجميل - Aura Beauty
const products = [
    {
        id: 1,
        name: "سيروم النضارة الفائق",
        price: "250 ر.س",
        image: "https://images.unsplash.com/photo-1620916566398-39f114352c4e?auto=format&fit=crop&q=80&w=800",
        category: "skincare",
        description: "سيروم غني بفيتامين C وحمض الهيالورونيك لإشراقة فورية وترطيب عميق."
    },
    {
        id: 2,
        name: "مرطب اللافندر الليلي",
        price: "180 ر.س",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
        category: "skincare",
        description: "كريم ليلي مهدئ يغذي البشرة بعمق أثناء النوم مع رائحة اللافندر المنعشة."
    },
    {
        id: 3,
        name: "أحمر شفاه كلاسيك - أحمر",
        price: "120 ر.س",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800",
        category: "makeup",
        description: "أحمر شفاه كريمي يدوم طويلاً بلمسة مطفية فاخرة."
    },
    {
        id: 4,
        name: "لوحة ظلال العيون الذهبية",
        price: "320 ر.س",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800",
        category: "makeup",
        description: "12 لوناً جذاباً تتراوح بين المطفية واللامعة لإطلالات متنوعة."
    },
    {
        id: 5,
        name: "زيت الوجه العضوي",
        price: "210 ر.س",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7abe71a0?auto=format&fit=crop&q=80&w=800",
        category: "skincare",
        description: "مزيج من الزيوت الطبيعية 100% لإصلاح حاجز البشرة وزيادة مرونتها."
    }
];

if (typeof module !== 'undefined') {
    module.exports = products;
}
