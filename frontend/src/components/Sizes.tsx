import { useState } from "react"
import Button from "./Buttons"


export default function Sizes({ type }: { type: 'shoes' | 'clothing' }) { 
    const ShoeSizes = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5]

    const ClothesSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    const [active, setActive] = useState<string | number | null>(null)

    return (
        <div>
                {type === 'shoes' && (
                <>
                    <h2 className="text-xl font-bold mt-8 mb-4">Select Size</h2>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {ShoeSizes.map(s => (
                            <Button key={s} variant={active === s ? 'default' : 'outline'} className="w-25" onClick={() => setActive(s)}>UK {s}</Button>
                        ))}
                    </div>
                </>
            )}

            {type === 'clothing' && (
                <>
                    <h2 className="text-xl font-bold mt-8 mb-4">Select Size</h2>
                    <div className="grid grid-cols-6 gap-2">
                        {ClothesSizes.map(s => (
                            <Button key={s} variant={active === s ? 'default' : 'outline'} className="p-2 text-sm" onClick={() => setActive(s)}>{s}</Button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}