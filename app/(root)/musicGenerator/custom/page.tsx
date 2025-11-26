'use client'
import MusicGeneratorForm from "../../../../components/musicgeneratorui/MusicGeneratorForm";
export default function CustomMusicGenerator() {
  return (
    <div>
      <MusicGeneratorForm 
            mode="custom"
            generateButtonText="生成自定义音乐"
          />
    </div>
  );
}