package com.viralengine.ml;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/ml")
public class PredictionController {

    @PostMapping("/predict-engagement")
    public Map<String, Object> predictEngagement(@RequestBody Map<String, String> request) {
        String caption = request.getOrDefault("caption", "");
        double score = 40.0 + Math.min(60.0, caption.length() * 0.5);
        
        // Mock prediction history for analytics
        List<Map<String, Object>> history = new ArrayList<>();
        for(int i=0; i<7; i++) {
            Map<String, Object> point = new HashMap<>();
            point.put("day", "Day " + (i+1));
            point.put("score", score - 15 + (Math.random() * 30));
            history.add(point);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("engagementScore", score);
        response.put("confidence", 0.89);
        response.put("history", history); // For growth charts
        return response;
    }

    @PostMapping("/suggest-captions")
    public Map<String, Object> suggestCaptions(@RequestBody Map<String, String> request) {
        String caption = request.getOrDefault("caption", "");
        String tone = request.getOrDefault("tone", "professional");
        
        List<String> suggestions = new ArrayList<>();
        if ("funny".equalsIgnoreCase(tone)) {
            suggestions.add("😂 " + caption + " (Don't @ me)");
            suggestions.add("POV: " + caption + " 💀");
            suggestions.add("My therapist said I should post this: " + caption);
        } else if ("emotional".equalsIgnoreCase(tone)) {
            suggestions.add("🥺 Story time: " + caption);
            suggestions.add("I wasn't going to share this but... " + caption + " ❤️");
            suggestions.add("Some things are too important not to say: " + caption);
        } else {
            suggestions.add("🔥 " + caption + " #MustWatch");
            suggestions.add(caption + " - What do you think? 👇");
            suggestions.add("You won't believe this! " + caption);
        }

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

    @PostMapping("/competitor-analysis")
    public Map<String, Object> competitorAnalysis(@RequestBody Map<String, String> request) {
        String category = request.getOrDefault("category", "general");
        Map<String, Object> response = new HashMap<>();
        response.put("topCompetitorAvgEngagement", 85.2);
        response.put("competitorKeywords", Arrays.asList("secret", "revealed", "tutorial", category));
        response.put("marketSaturation", "Medium - Good Opportunity");
        return response;
    }

    @PostMapping("/ab-testing")
    public Map<String, Object> abTesting(@RequestBody Map<String, String> request) {
        String caption = request.getOrDefault("caption", "Your post");
        Map<String, Object> testA = new HashMap<>();
        testA.put("variant", "A");
        testA.put("hook", "Question Based");
        testA.put("example", "Did you know? " + caption);
        
        Map<String, Object> testB = new HashMap<>();
        testB.put("variant", "B");
        testB.put("hook", "Statistic Based");
        testB.put("example", "99% of people fail this. " + caption);

        Map<String, Object> response = new HashMap<>();
        response.put("suggestions", Arrays.asList(testA, testB));
        return response;
    }
}
