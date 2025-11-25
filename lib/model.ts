const AI_MODELS_CONFIG = {
    // 音乐生成模型
    musicGeneration: {
        category: "音乐生成",
        models: [
            {
                id: "model-music-gen-1",
                name: "旋律大师",
                description: "擅长生成流行音乐旋律",
                capabilities: ["流行", "电子", "轻音乐"],
                cost: 10,
                quality: "standard",
                maxLength: 240, 
                instruments: ["钢琴", "吉他", "鼓组"]
            },
            {
                id: "model-music-gen-2", 
                name: "交响专家",
                description: "专业古典和交响乐生成",
                capabilities: ["古典", "交响", "电影配乐"],
                cost: 15,
                quality: "premium",
                maxLength: 360,
                instruments: ["弦乐", "管乐", "合唱"]
            },
            {
                id: "model-music-gen-3",
                name: "爵士 maestro",
                description: "专业爵士音乐生成",
                capabilities: ["爵士", "电子", "舞曲"],
                cost: 12,
                quality: "premium",
                maxLength: 360,
                instruments: ["吉他", "鼓组", "键盘"]
            },
            {
                id: "model-music-gen-4",
                name: "乡村音乐",
                description: "生成乡村风格的音乐",
                capabilities: ["乡村", "电子", "舞曲"],
                cost: 12,
                quality: "premium",
                maxLength: 360,
                instruments: ["吉他", "鼓组", "键盘"]
            },
            {
                id: "model-music-gen-5",
                name: "电子音乐",
                description: "生成电子风格的音乐",
                capabilities: ["电子", "舞曲"],
                cost: 12,
                quality: "premium",
                maxLength: 360,
                instruments: ["吉他", "鼓组", "键盘"]
            },
        ]
    },
}