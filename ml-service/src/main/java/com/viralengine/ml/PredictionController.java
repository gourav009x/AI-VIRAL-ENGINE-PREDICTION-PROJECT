package com.viralengine.ml;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/ml")
public class PredictionController {

    @PostMapping("/predict-engagement")
    public Map<String, Object> predictEngagement(@RequestBody Map<String, String> request) {
        String caption = request.getOrDefault("caption", "");
        // Mocked ML logic based on caption length
        double score = 40.0 + Math.min(60.0, caption.length() * 0.5);
        Map<String, Object> response = new HashMap<>();
        response.put("engagementScore", score);
        response.put("confidence", 0.85);
        return response;
    }

    @PostMapping("/suggest-captions")
    public Map<String, Object> suggestCaptions(@RequestBody Map<String, String> request) {
        String caption = request.getOrDefault("caption", "");
        List<String> suggestions = Arrays.asList(
            "🔥 " + caption + " #MustWatch",
            caption + " - What do you think? 👇",
            "You won't believe this! " + caption
        );
        Map<String, Object> response = new HashMap<>();
        response.put("suggestions", suggestions);
        return response;
    }

    @PostMapping("/recommend-hashtags")
    public Map<String, Object> recommendHashtags(@RequestBody Map<String, String> request) {
        String category = request.getOrDefault("category", "general");
        List<String> hashtags = Arrays.asList("#" + category, "#viral", "#trending", "#foryou", "#explore");
        Map<String, Object> response = new HashMap<>();
        response.put("hashtags", hashtags);
        return response;
    }

    @PostMapping("/predict-time")
    public Map<String, Object> predictTime(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("bestPostingTime", "18:30");
        response.put("timezone", "UTC");
        return response;
    }
}
