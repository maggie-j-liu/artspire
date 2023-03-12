import { Supply } from "@/components/Supply";
import { headers } from "@/next.config";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const emojis = ["✏️", "🎨", "🖌️", "✨", "📝", "🖋️", "🖼️", "✍️"];

const Generate = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState("");
  const [steps, setSteps] = useState("");
  const [sampleImage, setSampleImage] = useState("");
  const [supplies, setSupplies] = useState([]);
  const [colors, setColors] = useState([]);
  const [emojiIdx, setEmojiIdx] = useState(0);
  const [generating, setGenerating] = useState(false);

  const getGeneration = async ({ supplies, colors }) => {
    if (generating) return;
    setGenerating(true);
    console.log("get gen", supplies, colors);
    const ai = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({
        supplies,
        colors,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setTitle(ai.title);
    setDescription(ai.description);
    setMaterials(ai.materials);
    setSteps(ai.steps);
    setSampleImage(ai.imageUrl);
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) return;
    if (!router.isReady) return;
    if (!router.query.supplies || !router.query.colors) {
      setError(true);
    }
    const parsedSupplies = JSON.parse(router.query.supplies);
    const parsedColors = JSON.parse(router.query.colors);
    setSupplies(parsedSupplies);
    setColors(parsedColors);
    getGeneration({
      supplies: parsedSupplies,
      colors: parsedColors,
    });
  }, [router.query, router.isReady]);

  useEffect(() => {
    if (!loading) return;
    const timeout = setTimeout(() => {
      setEmojiIdx((emojiIdx + 1) % emojis.length);
    }, 700);
    return () => clearTimeout(timeout);
  }, [loading, emojiIdx]);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-3xl">
        {emojis[emojiIdx]} generating...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-8 py-10">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="font-medium text-gray-500">{description}</p>
        <h2 className="mt-4 text-lg font-medium">Materials</h2>
        <div className="whitespace-pre-wrap">{materials}</div>
        <h2 className="mt-4 text-lg font-medium">Steps</h2>
        <div className="whitespace-pre-wrap">{steps}</div>
        <Image
          className="mt-6 w-3/5"
          width={1024}
          height={1024}
          src={sampleImage}
          alt={description}
        />
        <div className="h-4" />
        <hr />
        <div className="h-4" />
        <div>
          <h2 className="text-lg font-medium">Supplies</h2>
          <ul className="grid grid-cols-3 gap-4">
            {supplies.map((supply) => (
              <li
                key={supply}
                className={
                  "rounded-lg  border-2 border-gray-300 bg-white px-4 py-4"
                }
              >
                <div>{supply}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-medium">Colors</h2>
          <ul className="grid grid-cols-5 gap-y-8">
            {colors.map((color) => (
              <li
                key={color}
                className="h-32 w-32 rounded-md border"
                style={{ backgroundColor: color }}
              >
                <div className="group flex h-full w-full items-center justify-center">
                  <div className="rounded-md bg-white/60 px-2.5 py-1 font-medium group-hover:bg-white">
                    {color}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Generate;
